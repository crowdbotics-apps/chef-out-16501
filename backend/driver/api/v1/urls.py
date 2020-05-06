from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import DriverOrderViewSet, DriverProfileViewSet

router = DefaultRouter()
router.register("driverprofile", DriverProfileViewSet)
router.register("driverorder", DriverOrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
