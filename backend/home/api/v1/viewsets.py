from rest_framework import viewsets
from rest_framework import authentication
from .serializers import CustomTextSerializer, HomePageSerializer
import json

from django import apps
from django.core.management import call_command
from .permissions import CrowboticsExclusive

from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from delivery_user_profile.models import Profile
from driver.models import DriverProfile
from fcm_django.models import FCMDevice

from home.api.v1.serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
    SocialTokenSerializer
)
from home.api.v1.serializers import (
    SignupSerializer,
    CustomTextSerializer,
    HomePageSerializer,
    UserSerializer,
    SocialTokenSerializer
)

from driver.api.v1.serializers import DriverProfileSerializer
from delivery_user_profile.api.v1.serializers import ProfileSerializer
from home.models import CustomText, HomePage

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]

class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        profile, created = Profile.objects.get_or_create(user=user)
        driver_profile, created = DriverProfile.objects.get_or_create(user=user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        profile_serializer = ProfileSerializer(profile)
        driver_profile_serializer = DriverProfileSerializer(driver_profile)
        return Response({"token": token.key, "user": user_serializer.data,"profile":profile_serializer.data,"driver_profile":driver_profile_serializer.data})

class SocialLoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = SocialTokenSerializer

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        profile, created = Profile.objects.get_or_create(user=user)
        driver_profile, created = DriverProfile.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        profile_serializer = ProfileSerializer(profile)
        driver_profile_serializer = DriverProfileSerializer(driver_profile)
        return Response({"token": token.key, "user": user_serializer.data,"profile":profile_serializer.data,"driver_profile":driver_profile_serializer.data})

class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]

class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]

class AppReportView(APIView):
    """
    DO NOT REMOVE THIS CODE SNIPPET, YOUR DASHBOARD MAY NOT REFLECT THE CORRECT
    RESOURCES IN YOUR APP.
    """

    permission_classes = [CrowboticsExclusive]

    def _get_models(self):
        project_models = apps.apps.get_models(
            include_auto_created=True, include_swapped=True
        )
        parsed_data = [
            str(model).split(".")[-1].replace("'", "").strip(">")
            for model in project_models
        ]
        return parsed_data

    def _get_urls(self):
        parsed_data = json.loads(call_command("show_urls", format="json"))
        return parsed_data

    def get(self, request):
        return Response(
            {"models": self._get_models(), "urls": self._get_urls()},
            status=status.HTTP_200_OK,
        )

class FCMToken(APIView):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request):
        data = request.data.get('data')
        fcm_token = data.get('fcm_token')
        user_id = data.get('user_id')
        
        obj, created = FCMDevice.objects.get_or_create(user_id=user_id,registration_id = fcm_token)

        return Response({"success": 'created fcm token'})