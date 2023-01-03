from rest_framework import viewsets
from ..models import CustomUser, Book, Review
from ..serializers import CustomUserSerializer, BookSerializer, ReviewSerializer
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response

class UserFilter(filters.FilterSet):
    avg_rating_gte = filters.NumberFilter(field_name='avg_rating', lookup_expr='gte')

    class Meta:
        model = CustomUser
        fields = {
            "avg_rating": ["gte"],
        }

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = UserFilter.Meta.fields

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
