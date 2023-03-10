# Generated by Django 4.1.5 on 2023-01-21 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=50, null=True, verbose_name='Post title')),
                ('description', models.CharField(blank=True, max_length=100, null=True, verbose_name='Post description')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
