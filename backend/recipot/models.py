from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    cooking_time = models.IntegerField()
    preheat_temperature = models.IntegerField()
    tags = models.ManyToManyField(Tag, through='RecipeTag')

    def __str__(self):
        return self.title

class RecipeTag(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.recipe.title} - {self.tag.name}"