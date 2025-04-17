# Generated by Django 5.2 on 2025-04-07 19:47

import base.models
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender_name', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(5)])),
                ('sender_email', models.EmailField(max_length=254)),
                ('content', models.TextField(validators=[django.core.validators.MinLengthValidator(10), django.core.validators.MaxLengthValidator(500), base.models.validate_message_content])),
                ('sent_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
