from django.urls import path,include
from api import views
from rest_framework.routers import DefaultRouter



router = DefaultRouter()
router.register('articles',views.ArticleViewSet,basename='articles')
router.register('users',views.UserViewSet,basename='users')

urlpatterns = [
    path('', views.home),
    path('api/',include(router.urls)),
    # path('articles/', views.articles_search),
    # path('article/<int:id>/', views.article_detail),
    # path('articles/',views.ArticleList.as_view()),
    # path('article/<int:id>/',views.ArticleDetails.as_view()),
]
