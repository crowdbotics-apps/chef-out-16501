from django.contrib import admin
from .models import Bill, Order, PaymentMethod

admin.site.register(Bill)
admin.site.register(Order)
admin.site.register(PaymentMethod)

# Register your models here.
