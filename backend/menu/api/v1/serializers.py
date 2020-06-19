from rest_framework import serializers
from menu.models import Category, Country, Item, ItemVariant, Review


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = "__all__"


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = "__all__"


class ItemVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVariant
        fields =  ('__all__')


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
