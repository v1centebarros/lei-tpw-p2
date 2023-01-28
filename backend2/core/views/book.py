from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Book
from ..serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['get'])
    def years(self, request):
        publish_date = Book.objects.values('publish_date').distinct()
        years = list(set([str(date['publish_date'].year) for date in publish_date if date['publish_date']]))
        return Response(years)
