"""backend2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include
from rest_framework import routers
from core.views.auth import login, register_author, register_user
from core.views.genre import GenreViewSet
from core.views.publisher import PublisherViewSet
from core.views.author import AuthorViewSet
from core.views.book import BookViewSet
from core.views.user import UserViewSet
from core.views.comment import CommentViewSet
from core.views.rating import RatingViewSet
from core.views.review import ReviewViewSet

router = routers.DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'publishers', PublisherViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'books', BookViewSet)
router.register(r'users', UserViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

     # api
    path('api/login/', login),
    path("api/user/register/", register_user),
    path("api/author/register/", register_author), 
    path('api/', include(router.urls)),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)