from rest_framework import generics
from .models import Recipe, Tag
from .serializers import RecipeSerializer, TagSerializer

class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

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
        qs = Recipe.objects.all()
        tag_name    = self.request.GET.get('tag')
        max_cook    = self.request.GET.get('cooking_time')
        max_preheat = self.request.GET.get('preheat_temperature')

        if tag_name:
            qs = qs.filter(tags__name__icontains=tag_name)
        if max_cook is not None:
            try:
                qs = qs.filter(cooking_time__lte=int(max_cook))
            except ValueError:
                pass
        if max_preheat is not None:
            try:
                qs = qs.filter(preheat_temperature__lte=int(max_preheat))
            except ValueError:
                pass

        return qs
