# Generated by Django 4.1.4 on 2023-01-01 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_alter_review_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='description',
            field=models.TextField(blank=True, max_length=1000, null=True),
        ),
    ]
