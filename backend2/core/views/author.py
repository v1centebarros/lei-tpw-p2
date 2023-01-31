from rest_framework import viewsets
from django_filters import rest_framework as django_filters
from ..models import Author
from ..serializers import AuthorSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.response import Response

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


    def update(self, request, pk=None):
        author = Author.objects.get(pk=pk)
        if 'oldpassword' in request.data and 'newpassword' in request.data:
            if check_password(request.data['oldpassword'],author.password):
                request.data['password'] = make_password(request.data['newpassword'])
            else:
                return Response({"error": "Old password is incorrect"}, status=status.HTTP_200_OK)
        elif 'password' in request.data:
            if check_password(request.data['password'],author.password):
                request.data['password'] = make_password(request.data['password'])
            else:
                return Response({"error": "Password is incorrect"}, status=status.HTTP_200_OK)
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)