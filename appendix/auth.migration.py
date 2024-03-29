# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', 
                    models.AutoField(
                        serialize=False, 
                        verbose_name='ID', 
                        primary_key=True, 
                        auto_created=True)),
                ('password', 
                    models.CharField(
                        verbose_name='password', 
                        max_length=128)),
                ('last_login', 
                    models.DateTimeField(
                        verbose_name='last login', 
                        default=django.utils.timezone.now)),
                ('email', 
                    models.EmailField(
                        unique=True, 
                        max_length=75)),
                ('username', 
                    models.CharField(
                        unique=True, 
                        max_length=30)),
                ('first_name', 
                    models.CharField(
                        max_length=30, 
                        blank=True)),
                ('last_name', 
                    models.CharField(
                        max_length=30, 
                        blank=True)),
                ('is_admin', 
                    models.BooleanField(
                        default=False)),
                ('activation_code', 
                    models.CharField(
                        unique=True, 
                        max_length=32)),
                ('created_at', 
                    models.DateTimeField(
                        auto_now_add=True)),
                ('updated_at', 
                    models.DateTimeField(
                        auto_now=True)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
