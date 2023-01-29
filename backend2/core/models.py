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

class Author(models.Model):
    name = models.CharField(max_length=40)
    email = models.EmailField()
    password = models.CharField(max_length=200) # hash + salt
    nationality = models.CharField(max_length=200)
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=500, default='', blank=True, null=True)
    image = models.ImageField(upload_to='authors', blank=True, null=True, default='authors/default.jpg')
    avg_rating = models.FloatField(default=0.0, blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

class Book(models.Model):

    class Language(models.TextChoices):
        ENGLISH = "English"
        PORTUGUESE = "Portuguese"
        SPANISH = "Spanish"
        #!COLOCAR MAIS

    title = models.CharField(max_length=255)
    pages = models.IntegerField()
    publish_date = models.DateField()
    language = models.CharField(max_length=100, choices=Language.choices)
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

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=200) # hash + salt
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=500, default='', blank=True, null=True)
    image = models.ImageField(upload_to='users', blank=True, null=True, default='users/default.jpg')
    fav_books = models.ManyToManyField(Book, db_table="app_user_fav_books", blank=True)
    fav_authors = models.ManyToManyField(Author, db_table= "app_user_fav_authors", blank=True)
    fav_publishers =  models.ManyToManyField(Publisher, db_table= "app_user_fav_publishers", blank=True)

    def __str__(self):
        return self.username

class Review(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
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

class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.TimeField(auto_now=datetime.now())
    text = models.TextField()