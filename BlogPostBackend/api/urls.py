from django.urls import path, include
from api import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("articles", views.ArticleViewSet, basename="articles")
router.register("users", views.UserViewSet, basename="users")

urlpatterns = [
    path("", views.home),
    path("api/", include(router.urls)),
]
