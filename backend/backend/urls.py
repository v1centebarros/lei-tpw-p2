
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include
from rest_framework import routers
from core.views.auth import login, register_user, register_author


urlpatterns = [
    path("admin/", admin.site.urls),
    # api
    path("api/login/", login),
    path("api/user/register/", register_user),
    path("api/author/register/", register_author),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)