
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

import core.views.publisher
from core.views.auth import login, logout, register

# from core.views.publisher import create_publisher, publisher_details,publisher_list


router = routers.DefaultRouter()
router.register(r'publishers', core.views.publisher.PublisherViewSet)
router.register(r'books', core.views.publisher.BookViewSet)
router.register(r'authors', core.views.publisher.AuthorViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("admin", admin.site.urls),
    path("register", register, name="register"),
    path("login", login, name="login"),
    # path("books/", book_list, name="book-list"),
    # path("publisher/<int:id>", PublisherDetail.as_view()),

    # path("publishers", PublisherList.as_view()),
]