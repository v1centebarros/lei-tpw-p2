from rest_framework import viewsets
from ..models import CustomUser, Book, Review, Rating
from ..serializers import CustomUserSerializer, BookSerializer, ReviewSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['get'], name='Get user books')
    def get_user_books(self, request, pk=None):
        books = Book.objects.filter(author=pk)
        books_info = []
        for book in books:
            info = BookSerializer(book).data
            info['image'] = 'http://127.0.0.1:8000' + info['image']
            books_info.append(info)

        return Response(books_info)

    @action(detail=True, methods=['get'], name='Get user reviews')
    def get_user_reviews(self, request, pk=None):
        reviews = Review.objects.filter(user=pk)
        reviews_info = []
        for review in reviews:
            info = ReviewSerializer(review).data
            reviews_info.append(info)

        return Response(reviews_info)

    @action(detail=True, methods=['get'], name='Get User Average Rating')
    def get_user_average_rating(self, request, pk=None):
        books = Book.objects.filter(author=pk)
        ratings = Rating.objects.filter(book__in=books)

        if len(ratings) == 0:
            return Response(0)
        
        avg_rating_per_book = []
        for rating in ratings:
            avg_rating_per_book.append(rating.rating)
        avg_rating = sum(avg_rating_per_book) / len(avg_rating_per_book)

        return Response(avg_rating)
