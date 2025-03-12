from django.urls import path
from.views import RecipeList, RecipeDetail, TagList, TagDetail, RecipeFilter

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipes/<int:pk>/', RecipeDetail.as_view()),
    path('tags/', TagList.as_view()),
    path('tags/<int:pk>/', TagDetail.as_view()),
    path('recipes/filter/', RecipeFilter.as_view()),
]