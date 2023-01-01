from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from ..models import Author
from ..serializers import AuthorSerializer


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user__username', 'user__first_name', 'user__last_name']
