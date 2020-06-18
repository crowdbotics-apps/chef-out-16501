from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import BillViewSet, OrderViewSet, PaymentMethodViewSet,OrdersAdd,OrderDelivered

router = DefaultRouter()
router.register("bill", BillViewSet)
router.register("order", OrderViewSet)
router.register("paymentmethod", PaymentMethodViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('add-order/', OrdersAdd.as_view()),
    path('delivered-order/', OrderDelivered.as_view()),
]
