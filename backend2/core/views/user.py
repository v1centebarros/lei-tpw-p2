from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from ..models import User,Book, Review, Author, Publisher
from ..serializers import UserSerializer, BookSerializer, ReviewSerializer,PublisherSerializer, AuthorSerializer
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    filter_backends = [filters.DjangoFilterBackend]

    def update(self, request, pk=None):
        user = User.objects.get(pk=pk)
        print(user)
        if 'password' in request.data:
            request.data['password'] = make_password(request.data['password'])
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], name='Get user fav Books')
    def get_fav_book(self,request, pk):
        user = User.objects.get(pk=pk)
        fav_books = user.fav_books.all()
        fav_books_info = []
        for book in fav_books:
            info = BookSerializer(book, context={"request":request}).data
            fav_books_info.append(info)
        return Response(fav_books_info)

    @action(detail=True, methods=['get'], name='Get user fav Authors')
    def get_fav_author(self,request,pk):
        user = User.objects.get(pk=pk)
        fav_authors = user.fav_authors.all()
        fav_authors_info = []
        for author in fav_authors:
            info = AuthorSerializer(author, context={"request":request}).data
            fav_authors_info.append(info)
        return Response(fav_authors_info)

    @action(detail=True, methods=['get'], name='Get user fav Publishers')
    def get_fav_publisher(self,request,pk):
        user = User.objects.get(pk=pk)
        fav_publishers = user.fav_publishers.all()
        fav_publishers_info = []
        for publisher in fav_publishers:
            info = PublisherSerializer(publisher, context={"request":request}).data
            fav_publishers_info.append(info)
        return Response(fav_publishers_info)

    @action(detail=True, methods=['get'], name='Get user reviews')
    def get_user_reviews(self, request, pk=None):
        reviews = Review.objects.filter(user=pk)
        reviews_info = []
        for review in reviews:
            info = ReviewSerializer(review, context={"request":request}).data
            reviews_info.append(info)

        return Response(reviews_info)

    # adicionar um book no favoritos
    @action(detail=True, methods=['post'], url_path='add_fav_book/(?P<book_id>[0-9]+)')
    def add_fav_book(self, request, pk=None, book_id=None):
        user = get_object_or_404(User, pk=pk)
        book = get_object_or_404(Book, pk=book_id)
        user.fav_books.add(book)
        return Response("Book added to fav")

    # remover um book dos favoritos
    @action(detail=True, methods=['delete'], url_path='remove_fav_book/(?P<book_id>[0-9]+)')
    def remove_fav_book(self, request, pk=None, book_id=None):
        user = get_object_or_404(User, pk=pk)
        book = get_object_or_404(Book, pk=book_id)
        user.fav_books.remove(book)
        return Response("Book removed from fav")

    # adicionar um author no favoritos
    @action(detail=True, methods=['post'], url_path='add_fav_author/(?P<author_id>[0-9]+)')
    def add_fav_author(self, request, pk=None, author_id=None):
        user = get_object_or_404(User, pk=pk)
        author = get_object_or_404(Author, pk=author_id)
        user.fav_authors.add(author)
        return Response("Author added to fav")

    # remover um author dos favoritos
    @action(detail=True, methods=['delete'], url_path='remove_fav_author/(?P<author_id>[0-9]+)')
    def remove_fav_author(self, request, pk=None, author_id=None):
        user = get_object_or_404(User, pk=pk)
        author = get_object_or_404(Author, pk=author_id)
        user.fav_authors.remove(author)
        return Response("Author removed from fav")

    # adicionar um publisher no favoritos
    @action(detail=True, methods=['post'], url_path='add_fav_publisher/(?P<publisher_id>[0-9]+)')
    def add_fav_publisher(self, request, pk=None, publisher_id=None):
        user = get_object_or_404(User, pk=pk)
        publisher = get_object_or_404(Publisher, pk=publisher_id)
        user.fav_publishers.add(publisher)
        return Response("Publisher added to fav")

    # remover um publisher dos favoritos
    @action(detail=True, methods=['delete'], url_path='remove_fav_publisher/(?P<publisher_id>[0-9]+)')
    def remove_fav_publisher(self, request, pk=None, publisher_id=None):
        user = get_object_or_404(User, pk=pk)
        publisher = get_object_or_404(Publisher, pk=publisher_id)
        user.fav_publishers.remove(publisher)
        return Response("Publisher removed from fav")


