from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import (
    CategoryViewSet,
    CountryViewSet,
    ItemViewSet,
    ItemViewWithCategorySet,
    ItemVariantViewSet,
    itemVarientCategorySet,
    ReviewViewSet,
    GetAllItems,
    PostReview
)

router = DefaultRouter()
router.register("category", CategoryViewSet)
router.register("item", ItemViewSet)
router.register("itemVarientFilter", itemVarientCategorySet,basename='item_with_category')
router.register("itemWithCategory", ItemViewWithCategorySet,basename='item_with_category')
router.register("country", CountryViewSet)
router.register("itemvariant", ItemVariantViewSet)
router.register("review", ReviewViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('allItems/', GetAllItems.as_view()),
    path('post-review/', PostReview.as_view()),
]
