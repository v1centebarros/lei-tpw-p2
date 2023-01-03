
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Publisher, Review, Rating, CustomUser, Genre


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'password',
            'email',
            'first_name',
            'last_name',
            'birth_date',
            'description',
            'favourites',
            'image',
            'password',
            'avg_rating'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class PublicCustomUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    birth_date = serializers.DateField()
    favourites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    image = serializers.ImageField()
    description = serializers.CharField()


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = [
            'id',
            'name',
            'address',
            'city',
            'country',
            'website',
        ]

class PublicPublisherSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    address = serializers.CharField()
    city = serializers.CharField()
    country = serializers.CharField()
    website = serializers.URLField()


class BookSerializer(serializers.ModelSerializer):
    publisher = serializers.SlugRelatedField(queryset=Publisher.objects.all(), slug_field='name')
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)
    author_info = PublicCustomUserSerializer(source='author', read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    class Meta:
        model = Book
        fields = [
            'id',
            'name',
            'pages',
            'publish_date',
            'language',
            'author',
            'author_info',
            'publisher',
            'isbn',
            'description',
            'image',
            'avg_rating'
        ]


class PublicBookSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    pages = serializers.IntegerField()
    publish_date = serializers.DateField()
    language = serializers.CharField()
    publisher = PublicPublisherSerializer()
    isbn = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField(use_url=True)
    author = PublicCustomUserSerializer()


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)
    user_info = PublicCustomUserSerializer(source='user', read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), write_only=True)
    book_info = PublicBookSerializer(source='book', read_only=True)
    date = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S")
    class Meta:
        model = Review
        fields = [
            'id',
            'book',
            'book_info',
            'user',
            'user_info',
            'review',
            'date',
        ]


class PublicReviewSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    user = PublicCustomUserSerializer()
    review = serializers.CharField()
    date = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S")


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), write_only=True)
    user_info = PublicCustomUserSerializer(source='user', read_only=True)
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), write_only=True)
    book_info = PublicBookSerializer(source='book', read_only=True)
    class Meta:
        model = Rating
        fields = [
            'id',
            'book',
            'book_info',
            'user',
            'user_info',
            'rating',
        ]



class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = [
            'id',
            'name',
        ]