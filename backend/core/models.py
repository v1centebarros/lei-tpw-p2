from django.contrib.auth.models import AbstractUser
from django.db import models

def upload_location_users(instance, filename):
    return '/'.join(['users', filename])


def upload_location_books(instance, filename):
    return '/'.join(['books', filename])


class  CustomUser(AbstractUser):
    birth_date = models.DateField(null=True, blank=True)
    favourites = models.ManyToManyField('Book', related_name='favourite_books', blank=True)
    description = models.TextField(max_length=500, default='', blank=True, null=True)
    image = models.ImageField(upload_to=upload_location_users, blank=True, null=True, default='users/default.jpg')
    avg_rating = models.FloatField(default=0)


class Publisher(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    website = models.URLField()

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Book(models.Model):
    name = models.CharField(max_length=255)
    pages = models.IntegerField()
    publish_date = models.DateField()
    language = models.CharField(max_length=255)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='books')
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    isbn = models.CharField(max_length=13)
    description = models.TextField()
    image = models.ImageField(upload_to=upload_location_books, blank=False, null=False, default='books/default.jpg')
    genres = models.ManyToManyField(Genre, related_name='genres', blank=True,null=True)
    avg_rating = models.FloatField(default=0)

    def __str__(self):
        return self.name


class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    review = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.review


class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
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
