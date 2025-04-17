# Generated by Django 5.2 on 2025-04-16 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_remove_payment_is_valid_payment_merchant_reference_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('currency', models.CharField(default='UGX', max_length=10)),
                ('message', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('merchant_reference', models.CharField(blank=True, max_length=100, null=True)),
                ('order_tracking_id', models.CharField(blank=True, max_length=100, null=True)),
                ('valid', models.BooleanField(default=False)),
            ],
        ),
        migrations.AddField(
            model_name='payment',
            name='country_code',
            field=models.CharField(choices=[('UG', 'Uganda'), ('KE', 'Kenya'), ('TZ', 'Tanzania'), ('RW', 'Rwanda'), ('MW', 'Malawi'), ('ZM', 'Zambia'), ('ZW', 'Zimbabwe')], default='UG', max_length=10),
        ),
    ]
