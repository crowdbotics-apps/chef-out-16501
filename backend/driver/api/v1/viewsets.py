from rest_framework import authentication
from driver.models import DriverOrder, DriverProfile
from .serializers import DriverOrderSerializer, DriverProfileSerializer
from rest_framework import viewsets


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
