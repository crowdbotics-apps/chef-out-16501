from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from home.models import CustomText, HomePage

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True, "style": {"input_type": "password"}},
            "email": {"required": True, "allow_blank": False,},
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
            request
            and not isinstance(request, HttpRequest)
            and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address.")
                )
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get("email"),
            name=validated_data.get("name"),
            username=generate_unique_username(
                [validated_data.get("name"), validated_data.get("email"), "user"]
            ),
        )
        user.set_password(validated_data.get("password"))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()

class SocialTokenSerializer(serializers.Serializer):
    provider = serializers.CharField(label=_("provider"))
    access_token = serializers.CharField(
        label=_("access_token"),
    )
    
    email = serializers.CharField(
        label=_("email"),
    )

    name = serializers.CharField(
        label=_("name"),
    )

    def validate(self, attrs):
        provider = attrs.get('provider')
        access_token = attrs.get('access_token')
        email = attrs.get('email')
        name = attrs.get('name')

        if provider and access_token and email and name:
          try:
            ## TODO AUTHENTICATE TOKEN
            user = User.objects.get(email=email)
            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
          except:
              user = User(
                email=email,
                username=generate_unique_username(
                  [name, email, "user"]
                ),
                name=name
              )
              user.save()
              user = User.objects.get(email=email)
        else:
            msg = _('Must include "provider" and "access_token" and "email" and "name".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class CustomTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomText
        fields = "__all__"


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePage
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name"]


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""

    password_reset_form_class = ResetPasswordForm
