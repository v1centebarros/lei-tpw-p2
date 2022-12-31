from django.contrib import admin
from .models import Publisher, Author, Book, Review, Rating, CustomUser

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Publisher)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Review)
admin.site.register(Rating)
