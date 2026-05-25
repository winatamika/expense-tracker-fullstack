from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import TransactionViewSet, monthly_summary

router = DefaultRouter()
router.register("transactions", TransactionViewSet, basename="transaction")

urlpatterns = [
    path("", include(router.urls)),
    path("summary/monthly/", monthly_summary, name="monthly-summary"),
]
