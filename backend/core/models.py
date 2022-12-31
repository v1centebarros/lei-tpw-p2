from django.contrib.auth.models import AbstractUser
from django.db import models


class  CustomUser(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    #TODO: Favorite Books

class Publisher(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    website = models.URLField()

class Author(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    publishers = models.ManyToManyField(Publisher)

class Book(models.Model):
    name = models.CharField(max_length=255)
    pages = models.IntegerField()
    publish_date = models.DateField()
    language = models.CharField(max_length=255)
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=13)
    description = models.TextField()

class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    review = models.TextField()

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField()
