from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from ..models import User as MyUser, Author, Token
from django.contrib.auth.hashers import make_password, check_password
from ..serializers import UserSerializer, AuthorSerializer
from django.contrib.auth.models import User as API_User

# !!TODO ALERAR ERROS E DADOS DE RESPOSTA

@api_view(['POST'])
def login(request):
    try:
        email = request.data['email']
        password = request.data['password']

        try:
            user = MyUser.objects.get(email=email)
            api_user = API_User.objects.get(email=email)
            if check_password(password, user.password):
                serializer = UserSerializer(user)
                token, _ = Token.objects.get_or_create(user=api_user)
                response = serializer.data
                response['token'] = token.key
                response["type"] = "user"
                return Response(response, status=status.HTTP_200_OK)
            return Response({"error": "wrong email or password"},status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            pass

        try:
            author = Author.objects.get(email=email)
            api_user = API_User.objects.get(email=email)
            if check_password(password, author.password):
                serializer = AuthorSerializer(author)
                token, _ = Token.objects.get_or_create(user=api_user)
                response = serializer.data
                response['token'] = token.key
                response["type"] = "author"
                return Response(response, status=status.HTTP_200_OK)
            return Response({"error": "wrong email or password"},status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            return Response({"error": "wrong email or password"},status=status.HTTP_200_OK)

    except KeyError:
        return Response({"error": "Invalid Credenciais"},status=status.HTTP_200_OK)

@api_view(['POST'])
def register_user(request):
    print(request.data)
    try:
        email_ = request.data['email']

        try:
            MyUser.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            pass
        try:
            Author.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            pass
        

        request.data['password'] = make_password(request.data['password'])
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            try:
                api_user = API_User.objects.get(email=user.email)
            except API_User.DoesNotExist:
                api_user = API_User.objects.create_user(email=user.email, password=user.password, username = user.username)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_author(request):
    try:
        email_ = request.data['email']

        try:
            MyUser.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_200_OK)
        except MyUser.DoesNotExist:
            pass
        
        try:
            Author.objects.get(email=email_)
            return Response({"error": "email already exists"}, status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            pass

        request.data['password'] = make_password(request.data['password'])
        serializer = AuthorSerializer(data=request.data)
        if serializer.is_valid():
            author = serializer.save()
            try:
                api_user = API_User.objects.get(email=author.email)
            except API_User.DoesNotExist:
                api_user = API_User.objects.create_user(email=author.email, password=author.password, username=author.name)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)