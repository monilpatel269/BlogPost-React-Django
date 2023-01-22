from django.db import models

# Create your models here.
class Article(models.Model):
    title = models.CharField(max_length=50,null=True,blank=True,verbose_name="Post title")
    description = models.CharField(max_length=100,null=True,blank=True,verbose_name="Post description")
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
