
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
    authors = serializers.SlugRelatedField(many=True, queryset=Author.objects.all(), slug_field='user__username')
    publisher = serializers.SlugRelatedField(queryset=Publisher.objects.all(), slug_field='name')

    class Meta:
        model = Book
        fields = ('id', 'name', 'pages', 'publish_date', 'language', 'authors', 'publisher', 'isbn', 'description', 'image')

    def create(self, validated_data):
        authors = validated_data.pop('authors')
        publisher = validated_data.pop('publisher')
        print("PUBLISHER: ",publisher)
        book = Book.objects.create(publisher=publisher)
        for author in authors:
            book.authors.add(author)
        book.publisher = publisher
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


