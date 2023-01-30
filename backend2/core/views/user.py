from rest_framework import viewsets
from ..models import User,Book, Review
from ..serializers import UserSerializer, BookSerializer, ReviewSerializer,PublisherSerializer, AuthorSerializer
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    filter_backends = [filters.DjangoFilterBackend]

    @action(detail=True, methods=['get'], name='Get user fav Books')
    def get_fav_book(self,request, pk):
        user = User.objects.get(pk=pk)
        fav_books = user.fav_books.all()
        fav_books_info = []
        for book in fav_books:
            info = BookSerializer(book).data
            fav_books_info.append(info)
        return Response(fav_books_info)

    @action(detail=True, methods=['get'], name='Get user fav Authors')
    def get_fav_author(self,request,pk):
        user = User.objects.get(pk=pk)
        fav_authors = user.fav_authors.all()
        fav_authors_info = []
        for author in fav_authors:
            info = AuthorSerializer(author).data
            fav_authors_info.append(info)
        return Response(fav_authors_info)

    @action(detail=True, methods=['get'], name='Get user fav Publishers')
    def get_fav_publisher(self,request,pk):
        user = User.objects.get(pk=pk)
        fav_publishers = user.fav_publishers.all()
        fav_publishers_info = []
        for publisher in fav_publishers:
            info = PublisherSerializer(publisher).data
            fav_publishers_info.append(info)
        return Response(fav_publishers_info)

    @action(detail=True, methods=['get'], name='Get user reviews')
    def get_user_reviews(self, request, pk=None):
        reviews = Review.objects.filter(user=pk)
        reviews_info = []
        for review in reviews:
            info = ReviewSerializer(review).data
            reviews_info.append(info)

        return Response(reviews_info)