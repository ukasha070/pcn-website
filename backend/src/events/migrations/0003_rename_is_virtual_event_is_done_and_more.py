# Generated by Django 5.2 on 2025-04-07 19:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_remove_event_categories'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='is_virtual',
            new_name='is_done',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='image',
            new_name='thumbnail',
        ),
    ]
