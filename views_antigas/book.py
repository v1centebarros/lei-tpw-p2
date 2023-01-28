
from rest_framework import viewsets
from django_filters import rest_framework as filters
from ..models import Book, CustomUser
from ..serializers import BookSerializer, CustomUserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class BookFilter(filters.FilterSet):
    class Meta:
        model = Book
        fields = {
            "name": ["icontains"],
            "language": ["exact"],
            "publish_date": ["year"],
            "publisher": ["exact"],
            "avg_rating": ["gte"],
        }


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = BookFilter.Meta.fields


    @action(detail=False, methods=['get'], name='Get all auhtors')
    def get_all_authors(self, request):
        authors = Book.objects.values('author').distinct()
        authors_info = []
        for author in authors:
            authors_info.append(CustomUserSerializer(CustomUser.objects.get(id=author['author'])).data)

        return Response(authors_info)

    @action(detail=False, methods=['get'], name='Get Available Years')
    def get_available_years(self, request):
        years = Book.objects.values('publish_date').distinct()
        years_info = []
        for year in years:
            if year['publish_date'].year not in years_info:
                years_info.append(year['publish_date'].year)
        
        return Response(years_info)
    

    @action(detail=False, methods=['get'], name='Get Available Languages')
    def get_available_languages(self, request):
        languages = Book.objects.values('language').distinct()
        languages_info = []
        for language in languages:
            if language['language'] not in languages_info:
                languages_info.append(language['language'])
        
        return Response(languages_info)


