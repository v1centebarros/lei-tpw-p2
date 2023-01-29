# Generated by Django 4.1.4 on 2023-01-29 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_comment_time_alter_review_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='time',
        ),
        migrations.RemoveField(
            model_name='review',
            name='time',
        ),
        migrations.AddField(
            model_name='comment',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='review',
            name='datetime',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
