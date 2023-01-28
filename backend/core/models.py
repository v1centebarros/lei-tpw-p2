from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
from datetime import datetime

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="publishers", blank=True, default='publishers/default.jpg')
    website = models.URLField()

    def __str__(self):
        return self.name

class Author(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=500, default='', blank=True, null=True)
    image = models.ImageField(upload_to='authors', blank=True, null=True, default='authors/default.jpg')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Book(models.Model):

    class Language(models.TextChoices):
        ENGLISH = "English"
        PORTUGUESE = "Portuguese"
        SPANISH = "Spanish"
        #!COLOCAR MAIS

    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    publish_date = models.DateField()
    language = models.CharField(choices=Language.choices)
    isbn = models.CharField(max_length=13)
    description = models.TextField()
    image = models.ImageField(upload_to='books', blank=True, null=True, default='books/default.jpg')
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    genres = models.ManyToManyField(Genre, related_name='genres', blank=True)
    avg_rating = models.FloatField(default=0.0, blank=True, null=True)
    num_ratings = models.IntegerField(default=0, blank=True, null=True)

    def __str__(self):
        return self.title

class User(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=500, default='', blank=True, null=True)
    image = models.ImageField(upload_to='users', blank=True, null=True, default='users/default.jpg')
    fav_blooks = models.ManyToManyField(Book, db_table="app_user_fav_blooks")
    fav_authors = models.ManyToManyField(Author, db_table= "app_user_fav_authors")
    fav_publishers =  models.ManyToManyField(Publisher, db_table= "app_user_fav_publishers")

    def __str__(self):
        return self.username


# def upload_location_users(instance, filename):
#     return '/'.join(['users', filename])


# def upload_location_books(instance, filename):
#     return '/'.join(['books', filename])


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    text = models.TextField()
    time = models.TimeField(auto_now=datetime.now())

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField()

    def save(self, *args, **kwargs):
        # Calculate the average rating for the book
        book = self.book
        ratings = book.ratings.all()
        sum_ratings = sum(rating.rating for rating in ratings)
        if len(ratings) > 0:
            book.avg_rating = sum_ratings / len(ratings)
        else:
            book.avg_rating = 0
        book.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.rating

class Reply(models.Model):
    id = models.AutoField(primary_key=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=datetime.now())
    text = models.TextField()