from django.contrib import admin
from .models import CustomUser, Profile
from django.contrib.auth.models import Group

admin.site.unregister(Group)

admin.site.register(CustomUser)
admin.site.register(Profile)
