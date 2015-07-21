
from .models import User as UserModel

class ModelBackend(object):
    """
    Authenticate against email and password under NDB UserModel
    """
    def authenticate(self, email=None, password=None, **kwargs):
        if email is None or password is None:
            return None
        try:
            user =  UserModel.query(UserModel.email == email).get()
            if user.check_password(password):
                return user
        except StandardError:
            return None

    def get_user(self, user_id):
        try:
            return UserModel.get_by_id(user_id)
        except StandardError:
            return None