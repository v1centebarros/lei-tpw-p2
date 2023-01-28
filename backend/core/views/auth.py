from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import User as MyUser, Token, Author
from django.contrib.auth.hashers import make_password, check_password
from ..serializers import UserSerializer, AuthorSerializer
from django.contrib.auth.models import User as API_User


@api_view(['POST'])
def login(request):
    try:
        username = request.data['username'] 
        password = request.data['password']

        try : 
            api_user = API_User.objects.get(username=username)
            user = MyUser.objects.get(user = api_user)
            if check_password(password, api_user.password):
                print("user")
                userSerializer = UserSerializer(user)
                token = Token.objects.get(user=user)
                response = userSerializer.data
                response["token"] = token.key
                response["type"] = "user"
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "Message": "Invalid password",
                    "Code": "HTTP_400_BAD_REQUEST",
                }, status=status.HTTP_400_BAD_REQUEST)

        except MyUser.DoesNotExist:
            pass

        try :
            api_user = Author.objects.get(username=username)
            author = Author.objects.get(user = api_user)
            if check_password(password, api_user.password):
                print("author")
                authorSerializer = AuthorSerializer(author)
                token = Token.objects.get(user=author)
                response = authorSerializer.data
                response["token"] = token.key
                response["type"] = "author"
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({
                    "Message": "Invalid password",
                    "Code": "HTTP_400_BAD_REQUEST",
                }, status=status.HTTP_400_BAD_REQUEST)

        except Author.DoesNotExist:
            return Response({
                    "Message": "User does not exist",
                    "Code": "HTTP_400_BAD_REQUEST",
                }, status=status.HTTP_400_BAD_REQUEST)

    except KeyError:
        return Response({
            "Message": "Please provide all required fields",
            "Code": "HTTP_400_BAD_REQUEST",
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def register_user(request):
    try:
        new_username = request.data['username']
        new_email = request.data['email']

        try:
            API_User.objects.get(username=new_username)
            API_User.objects.get(email=new_email)
            return Response({
                "Message": "Username or Email already exists",
                "Code": "HTTP_400_BAD_REQUEST",
            }, status=status.HTTP_400_BAD_REQUEST)
        except API_User.DoesNotExist:
            pass

        new_password = make_password(request.data['password'])
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid():
            new_user = API_User.objects.create_user(
                username=new_username,
                email=new_email,
                password=new_password,
                first_name = request.data['first_name'],
                last_name = request.data['last_name']
            )    
            new_user.save()
            user = userSerializer.save()
            user = MyUser.objects.get(user=new_user)
            return Response(user, status=status.HTTP_201_CREATED)

        else:
            return Response({
                "Message": "Invalid data",
                "Code": "HTTP_400_BAD_REQUEST",
            }, status=status.HTTP_400_BAD_REQUEST)

    except KeyError:
        return Response({
            "Message": "Please provide all required fields",
            "Code": "HTTP_400_BAD_REQUEST",
        }, status=status.HTTP_400_BAD_REQUEST)

# !NAO 
@api_view(['POST'])
def register_author(request):
    try:
        new_username = request.data['username']
        new_email = request.data['email']

        try:
            MyUser.objects.get(username=new_username)
            MyUser.objects.get(email=new_email)
            return Response({
                "Message": "Username or Email already exists",
                "Code": "HTTP_400_BAD_REQUEST",
            }, status=status.HTTP_400_BAD_REQUEST)
        except MyUser.DoesNotExist:
            pass

        try:
            Author.objects.get(username=new_username)
            Author.objects.get(email=new_email)
            return Response({
                "Message": "Username or Email already exists",
                "Code": "HTTP_400_BAD_REQUEST",
            }, status=status.HTTP_400_BAD_REQUEST)

        except Author.DoesNotExist:
            pass

        new_password = request.data['password']
        userSerializer = UserSerializer(data=request.data)
        if UserSerializer.is_valid():
            userSerializer.save()
            user = Author.objects.get(username=new_username)
            user.password = make_password(new_password)
            user.save()
            token = Token.objects.create(user=user)
            response = userSerializer.data
            response["token"] = token.key
            response["type"] = "author"
            return Response(response, status=status.HTTP_201_CREATED)

        else:
            return Response({
                "Message": "Invalid data",
                "Code": "HTTP_400_BAD_REQUEST",
            }, status=status.HTTP_400_BAD_REQUEST)

    except KeyError:
        return Response({
            "Message": "Please provide all required fields",
            "Code": "HTTP_400_BAD_REQUEST",
        }, status=status.HTTP_400_BAD_REQUEST)