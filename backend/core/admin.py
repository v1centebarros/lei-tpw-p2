from django.contrib import admin
from .models import Publisher, Book, Review, Rating, CustomUser, Genre
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Rating)
admin.site.register(Genre)
