from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Rating
from ..serializers import RatingSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user', 'book']