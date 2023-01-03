
from rest_framework import viewsets
from django_filters import rest_framework as filters
from ..models import Book, CustomUser
from ..serializers import BookSerializer, CustomUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class BookFilter(filters.FilterSet):
    class Meta:
        model = Book
        fields = {
            "language": ["exact"],
            "publish_date": ["year"],
            "publisher": ["exact"],
            "avg_rating": ["gte"],
        }


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = BookFilter.Meta.fields


    @action(detail=False, methods=['get'], name='Get all auhtors')
    def get_all_authors(self, request):
        authors = Book.objects.values('author').distinct()
        authors_info = []
        for author in authors:
            authors_info.append(CustomUserSerializer(CustomUser.objects.get(id=author['author'])).data)

        return Response(authors_info)
