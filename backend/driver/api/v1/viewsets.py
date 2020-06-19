from rest_framework import authentication
from driver.models import DriverOrder, DriverProfile
from .serializers import DriverOrderSerializer, DriverProfileSerializer
from rest_framework import viewsets
from django.db.models.expressions import RawSQL
from delivery_order.models import Order,Bill
from django.core.serializers.json import DjangoJSONEncoder

from rest_framework.views import APIView,Response
from django.http import HttpResponse
import json

class DriverProfileViewSet(viewsets.ModelViewSet):
    serializer_class = DriverProfileSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = DriverProfile.objects.all()


class DriverOrderViewSet(viewsets.ModelViewSet):
    serializer_class = DriverOrderSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = DriverOrder.objects.all()

def get_locations_nearby_coords(location_latitude, location_longitude,driver_id, max_distance=None):
    """
    Return objects sorted by distance to specified coordinates
    which distance is less than max_distance given in kilometers
    """
    # Great circle distance formula
    gcd_formula = "6371 * acos(least(greatest(\
    cos(radians(%s)) * cos(radians(location_latitude)) \
    * cos(radians(location_longitude) - radians(%s)) + \
    sin(radians(%s)) * sin(radians(location_latitude)) \
    , -1), 1))"
    distance_raw_sql = RawSQL(
        gcd_formula,
        (location_latitude, location_longitude, location_latitude)
    )
    qs = Bill.objects.prefetch_related ('order_bill').all().annotate(distance=distance_raw_sql).order_by('distance')
    if max_distance is not None:
        qs = qs.filter(distance__lt=max_distance,driverorder_order__driver_id=driver_id)
    return qs

class GetDriverOrder(APIView):
    """
    Returns the Details of the cart
    """
    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request):
        
        location_latitude = self.request.query_params.get('location_latitude', None)
        location_longitude = self.request.query_params.get('location_longitude', None)
        distance = self.request.query_params.get('distance', None)
        driver_id = self.request.query_params.get('driver_id', None)

        bills = get_locations_nearby_coords(location_latitude,location_longitude,driver_id, distance)
        print(bills.values())
        #items = DriverOrder.objects.select_related("driver").filter(driver_id=driver_id)
        
        item_json = [{
              'id': bill.id,
              'location_latitude': bill.location_latitude,
              'location_longitude': bill.location_longitude,
              'status': bill.status,
              'timestamp_created': bill.timestamp_created,
              'total_amount': bill.total_amount,
              'distance': bill.distance,
              'first_name': bill.contact_info.first_name,
              'last_name': bill.contact_info.last_name,
              'phone': bill.contact_info.phone,
              'address': bill.address,
              'order' : [{
                'status': order.status,
                'notes': order.notes,
                'timestamp_created': order.timestamp_created,
                'payment_method': order.payment_method.name,
                'price': order.total_price,
                'item': {
                  'id': order.item_variant.id,
                  'name': order.item_variant.name,
                  'description': order.item_variant.description,
                  'image': order.item_variant.image.url,
                  'category': order.item_variant.item.category.name,
                  'category_id': order.item_variant.item.category.id,
                }
              } for order in bill.order_bill.all()]
          } for bill in bills]

        return HttpResponse( json.dumps(item_json, cls=DjangoJSONEncoder) , content_type="text/json-comment-filtered")
