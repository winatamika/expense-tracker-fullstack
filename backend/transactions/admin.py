from django.contrib import admin

from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("title", "amount", "type", "category", "created_at")
    list_filter = ("type", "category", "created_at")
    search_fields = ("title", "category")
