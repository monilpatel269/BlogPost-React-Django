from rest_framework.serializers import ModelSerializer
from api.models import Article
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        extra_kwargs = {
            "password": {
                "write_only": True,
                "required": True,
            }
        }

    def create(self, validated_data):
        user = User.objects.create_superuser(**validated_data)
        Token.objects.create(user=user)
        return user
