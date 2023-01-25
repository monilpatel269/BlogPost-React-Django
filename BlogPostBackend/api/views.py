from django.shortcuts import HttpResponse
from api.serializers import UserSerializer, ArticleSerializer
from api.models import Article
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.


def home(request):
    return HttpResponse("It is working")


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter()
    serializer_class = UserSerializer
