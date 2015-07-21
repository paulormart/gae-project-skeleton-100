
import logging

from google.appengine.ext import ndb
from google.net.proto import ProtocolBuffer


def _get_owner(entity_key, kind='User'):
    if entity_key.kind() == kind or entity_key.parent() is None:
        return entity_key.get()
    else:
        parent_key = entity_key.parent()
        return _get_owner(parent_key, kind)


class AbstractCoreModel(ndb.Model):

    class Meta:
        abstract = True

    changed_on = ndb.DateTimeProperty(auto_now=True)
    created_on = ndb.DateTimeProperty(auto_now_add=True)
    # super_status field, in case admin staff needs to disable the entry
    super_status = ndb.BooleanProperty(default=True)

    # ############### #
    # General Methods #
    # ############### #

    @classmethod
    def _post_delete_hook(cls, key, future):
        # delete all children
        ndb.delete_multi(ndb.Query(ancestor=key).iter(keys_only = True))

    def __str__(self):
        return str(self.key)

    @classmethod
    def query_ancestor(cls, ancestor):
        # Note: fetch should be done on the model to allow filtering..
        # return cls.query(ancestor=ancestor.key).order(-cls.created_on).fetch()
        return cls.query(ancestor=ancestor.key)

    @classmethod
    def get_by_ancestor(cls, ancestor):
        # Note: can be used in relations 1-to-1
        return cls.query(ancestor=ancestor.key).get()

    @classmethod
    def get_by_key_url(cls, key_url):
        return cls._get_by_key_url(kind=cls._class_name(), key_url=key_url)
        # try:
        #     key = ndb.Key(urlsafe=key_url)
        # except ProtocolBuffer.ProtocolBufferDecodeError:
        #     return None
        # if key.kind() == cls.__name__:
        #     return key.get()
        # return None

    @staticmethod
    def _get_by_key_url(kind, key_url):
        try:
            key = ndb.Key(urlsafe=key_url)
        except ProtocolBuffer.ProtocolBufferDecodeError:
            return None
        if key.kind() == kind:
            return key.get()
        return None

    @property
    def key_url(self):
        if self.key:
            return self.key.urlsafe()
        return None

    def get_owner(self, kind='User'):
        return _get_owner(self.key, kind)

    @property
    def owner_key_url(self):
        return self.get_owner().key_url

    def get_parent(self):
        if self.key.parent():
            return self.key.parent().get()
        return None

    @property
    def parent_key_url(self):
        if self.get_parent():
            return self.get_parent().key_url
        return None


