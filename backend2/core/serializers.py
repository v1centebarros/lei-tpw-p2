
from rest_framework import serializers
from core.models import Book, Publisher, Comment, Rating, User , Genre, Author, Reply

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
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
        fields = '__all__'


### !!EXPLICAR A MARIANA
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

class PublicPublisherSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    email = serializers.EmailField()
    address = serializers.CharField()
    city = serializers.CharField()
    country = serializers.CharField()
    website = serializers.URLField()

class BookSerializer(serializers.ModelSerializer):
    publisher = serializers.SlugRelatedField(queryset=Publisher.objects.all(), slug_field='name')
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), write_only=True)
    author_info = PublicCustomUserSerializer(source='author', read_only=True)
    avg_rating = serializers.FloatField(read_only=True)
    image = serializers.ImageField(read_only=True)
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

class PublicCommentSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    user = PublicCustomUserSerializer()
    comment = serializers.CharField()
    time = serializers.TimeField()


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
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