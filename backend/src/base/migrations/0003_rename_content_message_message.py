# Generated by Django 5.2 on 2025-04-08 22:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_message'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='content',
            new_name='message',
        ),
    ]
