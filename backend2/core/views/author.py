from rest_framework import viewsets
from django_filters import rest_framework as django_filters
from ..models import Author
from ..serializers import AuthorSerializer

class AuthorFilter(django_filters.FilterSet):
    rating = django_filters.NumberFilter(field_name='avg_rating', lookup_expr='gte')

    class Meta:
        model = Author
        fields = ['rating']

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [django_filters.DjangoFilterBackend]
    filterset_class = AuthorFilter