from rest_framework import viewsets
from django_filters import rest_framework as django_filters
from ..models import Review
from ..serializers import ReviewSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [django_filters.DjangoFilterBackend]
    filterset_fields = ['book']