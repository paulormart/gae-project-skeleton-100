from django.dispatch import Signal

user_logged_in = Signal(providing_args=['request', 'user'])
user_signed_up = Signal(providing_args=['request', 'user'])
reset_password = Signal(providing_args=['request','user'])
