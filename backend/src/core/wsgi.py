"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

from django.core.wsgi import get_wsgi_application
from decouple import config
import os

env = config('DJANGO_ENV', default="development")

if env == "production":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings_prod")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")


application = get_wsgi_application()

# this is django march
