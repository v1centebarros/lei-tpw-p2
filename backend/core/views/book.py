
from rest_framework import viewsets
from django_filters import rest_framework as filters
from ..models import Book
from ..serializers import BookSerializer


class BookFilter(filters.FilterSet):
    class Meta:
        model = Book
        fields = {
            "language": ["exact"],
            "publish_date": ["exact", "year"],
            "publisher": ["exact"],
        }


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = BookFilter.Meta.fields

