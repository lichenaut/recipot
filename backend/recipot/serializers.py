from rest_framework import serializers
from.models import Recipe, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class RecipeSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'cooking_time', 'preheat_temperature', 'tags']

    def get_tags(self, obj):
        return TagSerializer(obj.tags.all(), many=True).data

    def create(self, validated_data):
        tags_data = self.context['request'].data.get('tags')
        recipe = Recipe.objects.create(title=validated_data['title'], description=validated_data['description'], cooking_time=validated_data['cooking_time'], preheat_temperature=validated_data['preheat_temperature'])
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            recipe.tags.add(tag)
        return recipe