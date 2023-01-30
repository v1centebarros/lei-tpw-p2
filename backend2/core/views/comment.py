from rest_framework import viewsets
from django_filters import rest_framework as django_filters
from ..models import Comment
from ..serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [django_filters.DjangoFilterBackend]
    filterset_fields = ['review']