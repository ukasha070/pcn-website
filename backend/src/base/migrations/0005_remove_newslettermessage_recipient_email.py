# Generated by Django 5.2 on 2025-04-09 00:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_newslettermessage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newslettermessage',
            name='recipient_email',
        ),
    ]
