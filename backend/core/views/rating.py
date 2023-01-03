from rest_framework import viewsets
from ..models import Rating, Book
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

        return super().perform_create(serializer)