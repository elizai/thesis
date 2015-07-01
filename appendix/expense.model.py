from django.db import models

from authentication.models import Account


class Expense(models.Model):

    account = models.ForeignKey(Account)
    timestamp = models.DateTimeField()
    description = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    comment = models.TextField(blank=True)
