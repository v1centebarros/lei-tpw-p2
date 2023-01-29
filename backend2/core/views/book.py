from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as django_filters
from ..models import Book
from ..serializers import BookSerializer

class BookFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name='title', lookup_expr='icontains')
    year = django_filters.CharFilter(field_name='publish_date', lookup_expr='year')
    rating = django_filters.NumberFilter(field_name='avg_rating', lookup_expr='gte')

    class Meta:
        model = Book
        fields = ['year', 'title', 'publisher', 'language', 'rating']

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter

    @action(detail=False, methods=['get'])
    def years(self, request):
        publish_date = Book.objects.values('publish_date').distinct()
        years = list(set([str(date['publish_date'].year) for date in publish_date if date['publish_date']]))
        return Response(years)
