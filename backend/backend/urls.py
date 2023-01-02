
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
import core.views.book, core.views.publisher, core.views.auth, core.views.user, core.views.review, core.views.rating, core.views.genre
from core.views.auth import login, logout, register
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'publishers', core.views.publisher.PublisherViewSet)
router.register(r'books', core.views.book.BookViewSet)
router.register(r'users', core.views.user.CustomUserViewSet)
router.register(r'reviews', core.views.review.ReviewViewSet)
router.register(r'ratings', core.views.rating.RatingViewSet)
router.register(r'genres', core.views.genre.GenreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("admin", admin.site.urls),
    path("register", register, name="register"),
    path("login", login, name="login"),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)