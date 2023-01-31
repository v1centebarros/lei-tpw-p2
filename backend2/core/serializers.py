
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
    user_image = serializers.ImageField(source='user.image', read_only=True)
    number_of_comments = serializers.IntegerField(source='comment_set.count', read_only=True)
    book_title = serializers.CharField(source='book.title', read_only=True)
    book_image = serializers.ImageField(source='book.image', read_only=True)

    class Meta:
        model = Review
        fields = [
            'id',
            'user',
            'user_name',
            'user_image',
            'book',
            'book_title',
            'book_image',
            'text',
            'datetime',
            'number_of_comments',
        ]

class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    user_image = serializers.ImageField(source='user.image', read_only=True)
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
    publisher_name = serializers.CharField(source='publisher.name', read_only=True)
    genre_name = serializers.CharField(source='genres.name', read_only=True)
    class Meta:
        model = Book
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
