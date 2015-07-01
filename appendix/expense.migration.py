# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(
            settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(
                    verbose_name='ID', 
                    auto_created=True, 
                    primary_key=True, 
                    serialize=False)),
                ('timestamp', 
                    models.DateTimeField()),
                ('description', 
                    models.CharField(
                        max_length=100)),
                ('amount', 
                    models.DecimalField(
                        max_digits=10, 
                        decimal_places=2)),
                ('comment', 
                    models.TextField(
                        blank=True)),
                ('account', models.ForeignKey(
                    to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
