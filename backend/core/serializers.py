
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
    user = serializers.SlugRelatedField(queryset=CustomUser.objects.all(), slug_field='username')


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


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"


