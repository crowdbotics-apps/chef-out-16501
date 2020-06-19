from django.conf import settings
from django.db import models


class Profile(models.Model):
    "Generated Model"
    user = models.OneToOneField(
        "users.User", on_delete=models.CASCADE, related_name="profile_user",
    )
    photo = models.URLField()
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    last_updated = models.DateTimeField(auto_now=True,)


class ContactInfo(models.Model):
    "Generated Model"
    profile = models.ForeignKey(
        "delivery_user_profile.Profile",
        on_delete=models.CASCADE,
        related_name="contactinfo_profile",
    )
    first_name = models.CharField(max_length=255,)
    last_name = models.CharField(max_length=255,)
    phone = models.CharField(max_length=20,)
    address = models.TextField()
    is_default = models.BooleanField()


# Create your models here.
