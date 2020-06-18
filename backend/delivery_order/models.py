from django.conf import settings
from django.db import models

STATUS_CHOICES = (
    ('pending','Pending'),
    ('ready_to_pick', 'Ready to Pick'),
    ('delivered','Deliverd'),
    ('processing','Processing'),
)

class Bill(models.Model):
    "Generated Model"
    total_amount = models.FloatField()
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    location_latitude = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    location_longitude = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    address = models.TextField()
    profile = models.ForeignKey(
        "delivery_user_profile.Profile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="bill_profile",
    )
    contact_info = models.ForeignKey(
        "delivery_user_profile.ContactInfo",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="bill_contact_info",
    )


class Order(models.Model):
    "Generated Model"
    quantity = models.IntegerField()
    total_price = models.FloatField()
    status = models.CharField(max_length=20)
    notes = models.TextField()
    bill = models.ForeignKey(
        "delivery_order.Bill", on_delete=models.CASCADE, related_name="order_bill",
    )
    timestamp_created = models.DateTimeField(auto_now_add=True,)
    item_variant = models.ForeignKey(
        "menu.ItemVariant",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="order_item_variant",
    )
    payment_method = models.ForeignKey(
        "delivery_order.PaymentMethod",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="order_payment_method",
    )
    profile = models.ForeignKey(
        "delivery_user_profile.Profile",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="order_profile",
    )


class PaymentMethod(models.Model):
    "Generated Model"
    name = models.CharField(max_length=255,)
    detail = models.TextField()


# Create your models here.
