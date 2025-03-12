from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from.models import Recipe, Tag
from.serializers import RecipeSerializer, TagSerializer

class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class RecipeFilter(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        tag_name = self.request.GET.get('tag')
        if tag_name:
            return Recipe.objects.filter(tags__name=tag_name)
        return Recipe.objects.all()