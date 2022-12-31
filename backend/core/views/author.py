from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from ..models import Author
from ..serializers import AuthorSerializer
from pprint import pprint
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    # permission_classes = [IsAuthenticated]
    filterset_fields = ['id']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        pprint(serializer.initial_data)
        serializer.is_valid(raise_exception=True)
        pprint(serializer.validated_data)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
