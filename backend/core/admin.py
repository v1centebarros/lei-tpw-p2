from django.contrib import admin
from .models import Publisher, Book, Review, Rating, CustomUser, Genre

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Rating)
admin.site.register(Genre)
