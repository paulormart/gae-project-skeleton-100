
import datetime

from django.core.mail import send_mail
from django.core import validators
from django.contrib.auth.hashers import (check_password, make_password, is_password_usable)
from django.utils.crypto import get_random_string, salted_hmac
from django.utils.translation import ugettext_lazy as _

from google.appengine.ext import ndb

from ...core.abstract_core_models import AbstractCoreModel

class AbstractBaseUser(AbstractCoreModel):
    password = ndb.StringProperty(required=True)
    last_login = ndb.DateTimeProperty(default=datetime.datetime.utcnow())

    class Meta:
        abstract = True

    def is_anonymous(self):
        """
        Always returns False. This is a way of comparing User objects to
        anonymous users.
        """
        return False

    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the user has been
        authenticated in templates.
        """
        return True

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        """
        Returns a boolean of whether the raw_password was correct. Handles
        hashing formats behind the scenes.
        """
        def setter(raw_password):
            self.set_password(raw_password)
            #self.save(update_fields=["password"])
            self.put()
        return check_password(raw_password, self.password, setter)

    def set_unusable_password(self):
        # Sets a value that will never be a valid hash
        self.password = make_password(None)

    def has_usable_password(self):
        return is_password_usable(self.password)

    def get_full_name(self):
        raise NotImplementedError('subclasses of AbstractBaseUser must provide a get_full_name() method')

    def get_short_name(self):
        raise NotImplementedError('subclasses of AbstractBaseUser must provide a get_short_name() method.')

    def get_session_auth_hash(self):
        """
        Returns an HMAC of the password field.
        """
        key_salt = "django.contrib.auth.models.AbstractBaseUser.get_session_auth_hash"
        return salted_hmac(key_salt, self.password).hexdigest()


class AbstractUser(AbstractBaseUser):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Username, password and email are required. Other fields are optional.
    """

    '''

    '''
    username = ndb.StringProperty(required=True, indexed=True)
                                 # validator=validators.RegexValidator(r'^[\w.@+-]+$',
                                 #                                     _('Enter a valid username.')))
    pk = ndb.IntegerProperty(indexed=True)
    email = ndb.StringProperty(required=True, indexed=True)

    first_name = ndb.StringProperty()
    last_name = ndb.StringProperty()
    # is_staff > Designates whether the user can log into special levels of this app
    is_staff = ndb.BooleanProperty(default=False)
    # is_active > Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
    is_active = ndb.BooleanProperty(default=True)

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        abstract = True

    def _post_put_hook(self, future):
        """
        https://cloud.google.com/appengine/docs/python/ndb/modelclass
        Hook that runs after put()
        """
        if not self.pk:
            self.pk = self.key.id()
            self.put()

    def save(self, *args, **kwargs):
        """
        # NOTE: The save method only exists because user_logged_in signal is called under django.contrib.auth.models
        # To avoid exceptions is added here
        """
        pass

    def get_username(self):
        "Return the identifying username for this User"
        return self.username

    # def __str__(self):
    #     return self.get_username()

    def natural_key(self):
        return (self.get_username(),)

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)


    @classmethod
    def normalize_email(cls, email):
        """
        Normalize the address by lowercasing the domain part of the email
        address.
        """
        email = email or ''
        try:
            email_name, domain_part = email.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            email = '@'.join([email_name, domain_part.lower()])
        return email