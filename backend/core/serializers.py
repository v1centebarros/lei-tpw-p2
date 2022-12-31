
from rest_framework import serializers

from .models import Book, Author, Publisher, Review, Rating, CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'birth_date']

class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    publishers = serializers.SerializerMethodField()

    class Meta:
        model = Author
        fields = ('id', 'user', 'publishers')

    def get_user(self, obj):
        user_serializer = CustomUserSerializer(obj.user)
        return user_serializer.data

    def get_publishers(self, obj):
        publisher_serializer = PublisherSerializer(obj.publishers.all(), many=True)
        return publisher_serializer.data

class BookSerializer(serializers.ModelSerializer):
    authors = serializers.SerializerMethodField()
    publisher = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ('id', 'name', 'pages', 'publish_date','authors', 'language', 'publisher', 'isbn', 'description')

    def get_authors(self, obj):
        author_serializer = AuthorSerializer(obj.authors.all(), many=True)
        return author_serializer.data

    def get_publisher(self, obj):
        publisher_serializer = PublisherSerializer(obj.publisher)
        return publisher_serializer.data



class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"


