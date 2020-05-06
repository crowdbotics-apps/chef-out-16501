from rest_framework import serializers
from driver.models import DriverOrder, DriverProfile


class DriverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = "__all__"


class DriverOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverOrder
        fields = "__all__"
