
from rest_framework import serializers

from .models import Book, Author, Publisher, Review, Rating, CustomUser
from pprint import pprint

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'birth_date']




class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"



class AuthorSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    publishers = serializers.SlugRelatedField(many=True, queryset=Publisher.objects.all(), slug_field='name')

    class Meta:
        model = Author
        fields = ['id', 'user', 'publishers']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        publishers = validated_data.pop('publishers')
        user = CustomUser.objects.create(**user_data)
        author = Author.objects.create(user=user)
        for publisher in publishers:
            author.publishers.add(publisher)
        author.save()

        return author



class BookSerializer(serializers.ModelSerializer):
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=Author.objects.all())
    publisher = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all())

    class Meta:
        model = Book
        fields = ('id', 'name', 'pages', 'publish_date', 'language', 'authors', 'publisher', 'isbn', 'description', 'image')

    def create(self, validated_data):
        authors_data = validated_data.pop('authors')
        publisher_data = validated_data.pop('publisher')
        book = Book.objects.create(**validated_data)
        for author_data in authors_data:
            book.authors.add(author_data)
        book.publisher = publisher_data
        book.save()
        return book




class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = "__all__"


