from django_filters import rest_framework as filters
from rest_framework import viewsets
from ..models import Publisher
from ..serializers import PublisherSerializer

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['name','city','country']
