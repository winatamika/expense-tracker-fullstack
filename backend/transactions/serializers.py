from rest_framework import serializers

from .models import Transaction


class MonthlySummaryQuerySerializer(serializers.Serializer):
    year = serializers.IntegerField(required=False, min_value=1)
    month = serializers.IntegerField(required=False, min_value=1, max_value=12)


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ["id", "title", "amount", "type", "category", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value.strip()

    def validate_category(self, value):
        if not value.strip():
            raise serializers.ValidationError("Category cannot be empty.")
        return value.strip()

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value
