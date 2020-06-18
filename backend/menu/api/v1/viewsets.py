from rest_framework import authentication
from menu.models import Category, Country, Item, ItemVariant, Review
from .serializers import (
    CategorySerializer,
    CountrySerializer,
    ItemSerializer,
    ItemVariantSerializer,
    ReviewSerializer,
)
from rest_framework import viewsets
from rest_framework.views import APIView,Response
import json
from django.http import HttpResponse
from django.core.serializers import serialize

from delivery_order.models import Bill, Order, PaymentMethod

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Category.objects.all()


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Item.objects.all()

class ItemViewWithCategorySet(viewsets.ModelViewSet):
  serializer_class = ItemSerializer
  def get_queryset(self):  
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    category = self.request.query_params.get('category', None)
    queryset = Item.objects.all()

    if category is not None:
        queryset = Item.objects.filter(category=category)

    return queryset

class ItemViewWithCategorySet(viewsets.ModelViewSet):
  serializer_class = ItemSerializer
  def get_queryset(self):  
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    category = self.request.query_params.get('category', None)
    queryset = Item.objects.all()

    if category is not None:
        queryset = Item.objects.filter(category=category)

    return queryset

class itemVarientCategorySet(viewsets.ModelViewSet):
  serializer_class = ItemVariantSerializer
  def get_queryset(self):  
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    item = self.request.query_params.get('item', None)
    country = self.request.query_params.get('country', None)
    queryset = ItemVariant.objects.select_related('item').all()

    if item is not None and country is not None:
        queryset = ItemVariant.objects.filter(item=item,country=country)

    return queryset

class CountryViewSet(viewsets.ModelViewSet):
    serializer_class = CountrySerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Country.objects.all()


class ItemVariantViewSet(viewsets.ModelViewSet):
    serializer_class = ItemVariantSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = ItemVariant.objects.all()


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Review.objects.all()


class PostReview(APIView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        data = request.data.get('data')
        bill_id = data.get('bill_id')
        rating = data.get('rating')
        review_text = data.get('review_text')
        
        bill=Bill.objects.prefetch_related ('order_bill').select_related('profile').filter(pk=bill_id).get()
        orders = bill.order_bill.all()
        for order in orders:
          reviewObj = Review(item_id=order.item_variant.item_id,rating=rating,review_text=review_text,profile_id=bill.profile.id)
          reviewObj.save()

        return Response({"success": 'Rating Done..'})


class GetAllItems(APIView):
    """
    Returns the Details of the cart
    """
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request):
        
        category = self.request.query_params.get('category', None)
        country = self.request.query_params.get('country', None)
        items = Item.objects.prefetch_related("itemvariant_item")
        
        if category is not None:
          items = Item.objects.prefetch_related("itemvariant_item").filter(category=category)

        if category is not None:
          variantItems = ItemVariant.objects.select_related("item").filter(item__category=category)
        
        if category is not None and country is not None:
          variantItems = ItemVariant.objects.select_related("item").filter(item__category=category,country=country)
      
        variantItem_json = [{
              'id': variantItem.id,
              'name': variantItem.name,
              'description':variantItem.description,
              'price': variantItem.price,
              'image': variantItem.image.url,
              'country': {
                'id': variantItem.country.id,
                'name': variantItem.country.name,
                'description': variantItem.country.name,
                'prefix': variantItem.country.prefix,
                'flag': variantItem.country.flag.url,
              },
              'item': {
                'id': variantItem.item.id,
                'name': variantItem.item.name,
                'description': variantItem.item.description,
                'image': variantItem.item.image.url,
                'category': variantItem.item.category.name,
                'category_id': variantItem.item.category.id,
               }
              
          } for variantItem in variantItems]

        items_json = [{
              'id': item.id,
              'name': item.name,
              'description':item.description,
              'image': item.image.url,
              'category':item.category.name,
              'category_id':item.category.id,
              'varients': [
              {
                'id': variant.id,
                'name': variant.name,
                'description': variant.description,
                'price': variant.price,
                'image': variant.image,
                'country_name': variant.country.name,
                'country_description': variant.country.name,
                'country_prefix': variant.country.prefix,
                'country_flag': variant.country.flag.url,
              } for variant in item.itemvariant_item.all()
            ]
          } for item in items]

        dict = {
          'items': items_json,
          #'itemVarient': json.loads(serialize('json', ItemVariant.objects.all())),
          #'category': json.loads(serialize('json', Category.objects.all())),
        }
        return HttpResponse( json.dumps(variantItem_json) , content_type="text/json-comment-filtered")
