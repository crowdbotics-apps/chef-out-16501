from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import CustomTextViewSet, HomePageViewSet
from fcm_django.api.rest_framework import FCMDeviceAuthorizedViewSet

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet,
    HomePageViewSet,
    CustomTextViewSet,
    AppReportView,
    SocialLoginViewSet
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("social-login", SocialLoginViewSet, basename="social-login")
router.register("customtext", CustomTextViewSet)
router.register("homepage", HomePageViewSet)
router.register(r'devices', FCMDeviceAuthorizedViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("report", AppReportView.as_view(), name="app_report"),
]
