# Generated by Django 4.1.4 on 2023-01-02 23:28

import core.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_genre_book_genres'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='image',
            field=models.ImageField(default='books/default.jpg', upload_to=core.models.upload_location_books),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image',
            field=models.ImageField(blank=True, default='users/default.jpg', null=True, upload_to=core.models.upload_location_users),
        ),
        migrations.AlterField(
            model_name='rating',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='core.book'),
        ),
    ]