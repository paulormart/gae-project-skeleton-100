import os

from django.views.generic import TemplateView

class IndexView(TemplateView):
    if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine'):
        template_name = 'index_production.html'
    else:
        template_name = 'index.html'
