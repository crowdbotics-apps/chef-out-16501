from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ContactInfoViewSet, ProfileViewSet

router = DefaultRouter()
router.register("profile", ProfileViewSet)
router.register("contactinfo", ContactInfoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
