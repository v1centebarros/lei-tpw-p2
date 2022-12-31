from django_filters import rest_framework as filters
from rest_framework import viewsets
from ..models import Publisher
from ..serializers import PublisherSerializer
from rest_framework.response import Response
from rest_framework import status

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['name','city','country']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
