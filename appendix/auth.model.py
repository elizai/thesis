import uuid
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager)
from django.core.mail import send_mail
from django.db import models


class AccountManager(BaseUserManager):
    def create_user(self, email, 
        username, password, 
        first_name='', last_name=''):
        if not email:
            raise ValueError(
                "Users must have a valid email address.")

        if not username:
            raise ValueError(
                "Users must have a valid username.")

        account = self.model(
            email=self.normalize_email(email), 
            username=username,
            first_name=first_name, 
            last_name=last_name)
        # TODO: create account as inactive and send activation link
        account.set_password(password)
        account.activation_code = uuid.uuid4().hex
        account.save()

        return account

    def create_superuser(
        self, email, 
        username, password, 
        first_name='', last_name=''):
        account = self.create_user(
            email, username, password,
            first_name=first_name, 
            last_name=last_name)

        account.is_admin = True
        account.save()

        return account

    def activate_user(self, activation_code):
        try:
            account = self.get(
                activation_code=activation_code)
        except Account.DoesNotExist:
            raise ValueError(
                'Invalid activation code.')

        if account.is_active:
            return False

        account.is_active = True
        account.save()
        return True


class Account(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)

    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)

    is_admin = models.BooleanField(default=False)

    activation_code = models.CharField(
        max_length=32, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def email_user(
        self, subject, 
        message, from_email=None, 
        **kwargs):
        send_mail(
            subject, message, 
            from_email, [self.email], 
            **kwargs)