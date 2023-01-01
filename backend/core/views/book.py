
from rest_framework import viewsets
from rest_framework.response import Response
from django_filters import rest_framework as filters
from ..models import Book
from ..serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['name', 'pages', 'publisher', 'publish_date', 'isbn']
