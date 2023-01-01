
from rest_framework import serializers
from .models import Book, Author, Publisher, Review, Rating, CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'birth_date',
            'favourites',
            'image',
        ]

class PublicCustomUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    birth_date = serializers.DateField()
    favourites = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    image = serializers.ImageField()


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


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset=CustomUser.objects.all(), slug_field='username')
    publishers = serializers.SlugRelatedField(queryset=Publisher.objects.all(), slug_field='name', many=True)
    class Meta:
        model = Author
        fields = [
            'id',
            'user',
            'publishers'
        ]


class PublicAuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = PublicCustomUserSerializer()
    publishers = PublicPublisherSerializer(many=True)


class BookSerializer(serializers.ModelSerializer):
    authors = PublicAuthorSerializer(many=True)
    publisher = serializers.SlugRelatedField(queryset=Publisher.objects.all(), slug_field='name')
    class Meta:
        model = Book
        fields = [
            'id',
            'name',
            'pages',
            'publish_date',
            'language',
            'authors',
            'publisher',
            'isbn',
            'description',
            'image',
        ]


class PublicBookSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    pages = serializers.IntegerField()
    publish_date = serializers.DateField()
    language = serializers.CharField()
    authors = PublicAuthorSerializer(many=True)
    publisher = PublicPublisherSerializer()
    isbn = serializers.CharField()
    description = serializers.CharField()
    image = serializers.ImageField()


class ReviewSerializer(serializers.ModelSerializer):
    user = PublicCustomUserSerializer()
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    date = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S")
    class Meta:
        model = Review
        fields = [
            'id',
            'book',
            'user',
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
    class Meta:
        model = Rating
        fields = "__all__"


