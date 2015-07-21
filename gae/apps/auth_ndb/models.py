
from google.appengine.ext import ndb

from .abstract_models import AbstractUser
from .utils import random_token

class User(AbstractUser):
    """
    Users within the Django authentication system are represented by this
    model.

    Username, password and email are required. Other fields are optional.
    """
    token = ndb.StringProperty(indexed=True)

    def _pre_put_hook(self):
        if not self.key.id():
            self.token = random_token()

    def get_owner(self):
        return self

    @property
    def key_url(self):
        if self.key:
            return self.key.urlsafe()
        return None

    @classmethod
    def get_by_username(cls, username):
        return cls.query(cls.username==username).get()

    @classmethod
    def get_by_token(cls, token):
        return cls.query(cls.token==token).get()

    @classmethod
    def get_by_email(cls, email):
        return cls.query(cls.email==email).get()



# ---------
# Register the Listening Signals
# ---------
from .signals_handler import *