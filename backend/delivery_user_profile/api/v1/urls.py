from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ContactInfoViewSet, ProfileViewSet

router = DefaultRouter()
router.register("contactinfo", ContactInfoViewSet)
router.register("profile", ProfileViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
