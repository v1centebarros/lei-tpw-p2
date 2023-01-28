from django.contrib import admin
from core.models import Publisher, Book, Comment, Rating, User, Genre, Author

# Register your models here.
admin.site.register(Genre)
admin.site.register(Publisher)
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Rating)

