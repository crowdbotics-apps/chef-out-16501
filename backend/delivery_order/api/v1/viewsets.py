from rest_framework import authentication
from delivery_order.models import Bill, Order, PaymentMethod
from .serializers import BillSerializer, OrderSerializer, PaymentMethodSerializer
from rest_framework import viewsets
from fcm_django.models import FCMDevice
from menu.models import Category, Country, Item, ItemVariant, Review

from rest_framework.views import APIView,Response
import json
from django.http import HttpResponse

from delivery_user_profile.models import ContactInfo, Profile

class BillViewSet(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Bill.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Order.objects.all()


class PaymentMethodViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentMethodSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = PaymentMethod.objects.all()

class OrdersAdd(APIView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        data = request.data.get('data')
        orders = data.get('orders')
        user = data.get('user')
        contact = data.get('contact')
        totalamount = data.get('total')
        location_latitude = data.get('location_latitude')
        location_longitude = data.get('location_longitude')
        print(data)
        profile = user.get('profile').get('id')
        payment, created = PaymentMethod.objects.get_or_create(name='COD')
        contact_info, created = ContactInfo.objects.get_or_create(
          profile_id= profile,
          first_name= contact.get('first_name'),
          last_name= contact.get('last_name'),
          phone= contact.get('phone'),
          address= contact.get('address'),
          is_default=True,
        )
        
        bill = Bill(
          profile_id=profile,
          contact_info=contact_info,
          total_amount= totalamount,
          location_latitude= location_latitude,
          location_longitude= location_longitude,
          address= contact.get('address'),
        )
        bill.save()
        for i, val in enumerate(orders): 
          orderModel = Order(
            quantity=val['quantity'],
            total_price= val['price'] * val['quantity'],
            bill=bill,
            payment_method = payment,
            profile_id = profile,
            item_variant_id =  val['id'],
            status="PENDING"
          )
          orderModel.save()
        
        
        return Response({"success": BillSerializer(bill).data})

class OrderDelivered(APIView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        data = request.data.get('data')
        bill_id = data.get('bill_id')
        
        bill=Bill.objects.select_related('profile').filter(pk=bill_id)
        bill.update(status='delivered')

        billObj = bill.get()
        print(billObj.profile.user_id)
        try:
          devices = FCMDevice.objects.filter(user_id=billObj.profile.user_id).get()
          devices.send_message(title="Order#{} Delivered".format(billObj.id), body="Rate the restaurant.", data={"bill": BillSerializer(billObj).data})
        except:
          print("not exist")

        return Response({"success": BillSerializer(billObj).data})