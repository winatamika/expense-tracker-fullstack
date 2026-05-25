from decimal import Decimal

from django.db.models import Sum
from django.utils import timezone
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Transaction
from .serializers import MonthlySummaryQuerySerializer, TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


@extend_schema(
    parameters=[
        OpenApiParameter(name="year", type=int, required=False, description="Four-digit year"),
        OpenApiParameter(name="month", type=int, required=False, description="Month number from 1 to 12"),
    ],
    responses={
        200: {
            "type": "object",
            "properties": {
                "year": {"type": "integer"},
                "month": {"type": "integer"},
                "total_income": {"type": "string"},
                "total_expense": {"type": "string"},
                "balance": {"type": "string"},
            },
        }
    },
)
@api_view(["GET"])
def monthly_summary(request):
    today = timezone.localdate()
    query_serializer = MonthlySummaryQuerySerializer(data=request.query_params)
    query_serializer.is_valid(raise_exception=True)

    year = query_serializer.validated_data.get("year", today.year)
    month = query_serializer.validated_data.get("month", today.month)

    transactions = Transaction.objects.filter(created_at__year=year, created_at__month=month)

    # Coalesce empty sums to Decimal for stable currency-style responses.
    total_income = (
        transactions.filter(type=Transaction.TransactionType.INCOME).aggregate(total=Sum("amount"))["total"]
        or Decimal("0.00")
    )
    total_expense = (
        transactions.filter(type=Transaction.TransactionType.EXPENSE).aggregate(total=Sum("amount"))["total"]
        or Decimal("0.00")
    )
    balance = total_income - total_expense

    return Response(
        {
            "year": year,
            "month": month,
            "total_income": f"{total_income:.2f}",
            "total_expense": f"{total_expense:.2f}",
            "balance": f"{balance:.2f}",
        }
    )
