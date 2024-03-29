from rest_framework import viewsets
from ..models import Publisher, Book
from ..serializers import BookSerializer, PublisherSerializer, AuthorSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    

    @action(detail=True, methods=['get'], name='Get Publisher Books')
    def get_publisher_books(self,request, pk):
        publisher = Publisher.objects.get(pk=pk)
        books = Book.objects.all()
        publisher_books = books.filter(publisher=publisher)
        publisher_books_info = []
        for book in publisher_books:
            print(book)
            info = BookSerializer(book, context={"request":request}).data
            publisher_books_info.append(info)
        return Response(publisher_books_info)

    @action(detail=True, methods=['get'], name='Get Publisher Authors')
    def get_publisher_authors(self,request, pk):
        publisher = Publisher.objects.get(pk=pk)
        books = Book.objects.all()
        publisher_books = books.filter(publisher=publisher)
        publisher_books_authors = []

        authors = []
        for book in publisher_books:
           authors.append(book.author) 

        for author in set(authors):
            info = AuthorSerializer(author, context={"request":request}).data
            publisher_books_authors.append(info)

        return Response(publisher_books_authors)
        