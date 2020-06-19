from django.contrib import admin
from .models import Category, Country, Item, ItemVariant, Review

admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Country)
admin.site.register(ItemVariant)
admin.site.register(Review)

# Register your models here.
