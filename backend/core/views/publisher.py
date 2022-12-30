
from rest_framework import viewsets

from django_filters import rest_framework as filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Publisher, Book, Author
from ..serializers import PublisherSerializer, BookSerializer, AuthorSerializer, CustomUserSerializer


class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = ['name','city','country']

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [IsAuthenticated]
    filterset_fields = '__all__'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)


class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    # permission_classes = [IsAuthenticated]
    filterset_fields = '__all__'

    def create(self, request, *args, **kwargs):
        user_data = request.data.pop('user')
        user_serializer = CustomUserSerializer(data=user_data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            request.data['user'] = user.pk
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
        else:
            return Response(user_serializer.errors)


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
