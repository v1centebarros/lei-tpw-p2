
from rest_framework import serializers
from core.models import Book, Publisher, Comment, Rating, User , Genre, Author, Review

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_image = serializers.CharField(source='user.image', read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'birth_date',
            'description',
            'image',
        ]

class AuthorSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Author
        fields = [
                'id',
                'name',
                'email',
                'password',
                'nationality',
                'birth_date',
                'description',
                'image',
                'avg_rating'
            ]


class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    class Meta:
        model = Book
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'