from django.conf import settings
from django.db import models


class DriverProfile(models.Model):
    "Generated Model"
    user = models.OneToOneField(
        "users.User", on_delete=models.CASCADE, related_name="driverprofile_user",
    )
    photo = models.URLField()
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    last_updated = models.DateTimeField(auto_now=True,)
    details = models.TextField(null=True, blank=True,)


class DriverOrder(models.Model):
    "Generated Model"
    order = models.OneToOneField(
        "delivery_order.Order",
        on_delete=models.CASCADE,
        related_name="driverorder_order",
    )
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    driver = models.ForeignKey(
        "driver.DriverProfile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="driverorder_driver",
    )


# Create your models here.
