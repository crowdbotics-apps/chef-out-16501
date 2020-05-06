from django.contrib import admin
from .models import Order, PaymentMethod, Bill

admin.site.register(Order)
admin.site.register(PaymentMethod)
admin.site.register(Bill)

# Register your models here.
