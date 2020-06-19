from django.conf import settings
from django.db import models


class DriverProfile(models.Model):
    "Generated Model"
    user = models.OneToOneField(
        "users.User", on_delete=models.CASCADE, related_name="driverprofile_user",
    )
    photo =  models.ImageField(upload_to ='uploads/driver/') 
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    last_updated = models.DateTimeField(auto_now=True,)
    details = models.TextField(null=True, blank=True,)


class DriverOrder(models.Model):
    "Generated Model"
    bill = models.OneToOneField(
        "delivery_order.Bill",
        on_delete=models.CASCADE,
        related_name="driverorder_bill",
    )
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    driver = models.ForeignKey(
        "driver.DriverProfile",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="driverorder_driver",
    )


# Create your models here.
