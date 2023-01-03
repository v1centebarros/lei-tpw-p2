from rest_framework import viewsets
from ..models import Rating, Book, CustomUser
from ..serializers import RatingSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

    def perform_create(self, serializer):
        # Save the rating to the database
        rating = serializer.save()

        # Calculate the average rating for the book
        book = rating.book
        ratings = book.ratings.all()
        sum_ratings = sum(rating.rating for rating in ratings)
        if len(ratings) > 0:
            book.avg_rating = sum_ratings / len(ratings)
        else:
            book.avg_rating = 0
        book.save()

        # Calculate the average rating for the author of the book
        author = book.author
        books = Book.objects.filter(author=author)
        ratings = Rating.objects.filter(book__in=books)
        sum_ratings = sum(rating.rating for rating in ratings)
        if len(ratings) > 0:
            author.avg_rating = sum_ratings / len(ratings)
        else:
            author.avg_rating = 0
        CustomUser.objects.filter(id=author.id).update(avg_rating=author.avg_rating)

        return super().perform_create(serializer)