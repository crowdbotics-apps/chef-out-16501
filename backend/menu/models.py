from django.conf import settings
from django.db import models


class Category(models.Model):
    "Generated Model"
    name = models.CharField(max_length=255,)
    description = models.TextField()
    image = models.ImageField(upload_to ='uploads/category/') 
    icon = models.ImageField(upload_to ='uploads/category_icon/') 


class Item(models.Model):
    "Generated Model"
    name = models.CharField(max_length=255,)
    description = models.TextField()
    image = models.ImageField(upload_to ='uploads/category_item/') 
    category = models.ForeignKey(
        "menu.Category",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="item_category",
    )


class Country(models.Model):
    "Generated Model"
    name = models.CharField(max_length=255,)
    description = models.TextField()
    prefix = models.CharField(max_length=8,)
    flag = models.ImageField(upload_to ='uploads/country/') 


class ItemVariant(models.Model):
    "Generated Model"
    name = models.CharField(max_length=255,)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField(upload_to ='uploads/item_varient/') 
    item = models.ForeignKey(
        "menu.Item", on_delete=models.CASCADE, related_name="itemvariant_item",
    )
    country = models.ForeignKey(
        "menu.Country", on_delete=models.CASCADE, related_name="itemvariant_country",
    )


class Review(models.Model):
    "Generated Model"
    item = models.ForeignKey(
        "menu.Item", on_delete=models.CASCADE, related_name="review_item",
    )
    rating = models.FloatField()
    review_text = models.TextField()
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    profile = models.ForeignKey(
        "delivery_user_profile.Profile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="review_profile",
    )


# Create your models here.
