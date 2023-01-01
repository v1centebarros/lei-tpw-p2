from rest_framework import viewsets
from ..models import CustomUser
from ..serializers import CustomUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    @action(detail=True, methods=['put'], name='Change description')
    def change_description(self, request, pk=None):
        user = self.get_object()
        user.description = request.data['description']
        user.save()
        return Response({'status': 'ok'})