from rest_framework import authentication
from delivery_user_profile.models import ContactInfo, Profile
from .serializers import ContactInfoSerializer, ProfileSerializer
from rest_framework import viewsets


class ContactInfoViewSet(viewsets.ModelViewSet):
    serializer_class = ContactInfoSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = ContactInfo.objects.all()


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Profile.objects.all()
