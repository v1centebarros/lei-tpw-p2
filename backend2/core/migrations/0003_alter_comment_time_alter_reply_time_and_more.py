# Generated by Django 4.1.4 on 2023-01-28 18:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_alter_comment_time_alter_reply_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='time',
            field=models.TimeField(auto_now=datetime.datetime(2023, 1, 28, 18, 27, 39, 673537)),
        ),
        migrations.AlterField(
            model_name='reply',
            name='time',
            field=models.TimeField(auto_now=datetime.datetime(2023, 1, 28, 18, 27, 39, 674061)),
        ),
        migrations.AlterField(
            model_name='user',
            name='fav_authors',
            field=models.ManyToManyField(blank=True, db_table='app_user_fav_authors', null=True, to='core.author'),
        ),
        migrations.AlterField(
            model_name='user',
            name='fav_blooks',
            field=models.ManyToManyField(blank=True, db_table='app_user_fav_blooks', null=True, to='core.book'),
        ),
        migrations.AlterField(
            model_name='user',
            name='fav_publishers',
            field=models.ManyToManyField(blank=True, db_table='app_user_fav_publishers', null=True, to='core.publisher'),
        ),
    ]