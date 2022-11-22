from .models import *
from rest_framework import viewsets,  permissions
from .serializers import *


class UtilizadorViewSet(viewsets.ModelViewSet):
    queryset = Utilizador.objects.all()
    serializer_class = UtilizadorSerializer
    permission_classes = [permissions.IsAuthenticated]
