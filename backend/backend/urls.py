
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import core.views.book, core.views.publisher, core.views.auth, core.views.author, core.views.user
from core.views.auth import login, logout, register

router = routers.DefaultRouter()
router.register(r'publishers', core.views.publisher.PublisherViewSet)
router.register(r'books', core.views.book.BookViewSet)
router.register(r'authors', core.views.author.AuthorViewSet)
router.register(r'users', core.views.user.CustomUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("admin", admin.site.urls),
    path("register", register, name="register"),
    path("login", login, name="login"),
]
