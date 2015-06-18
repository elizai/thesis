from datetime import datetime, timedelta
import dateutil.parser

from rest_framework import viewsets, permissions
from expenses.models import Expense
from expenses.permissions import IsExpenseOwner
from expenses.serializers import ExpenseSerializer


class ExpensesViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()

    def get_permissions(self):
        return (permissions.IsAuthenticated(), 
            IsExpenseOwner())

    def get_queryset(self):
        queryset = self.queryset.filter(
            account=self.request.user)

        week_contains = self.request.QUERY_PARAMS.get(
            'week_contains')
        if week_contains:
            dt = dateutil.parser.parse(week_contains)
            start_date = dt - timedelta(days=dt.weekday())
            end_date = start_date + timedelta(days=7)

            queryset = queryset.filter(
                timestamp__gte=start_date, 
                timestamp__lt=end_date)

        return queryset.order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)
