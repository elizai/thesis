from django.conf.urls import patterns, url, include
from rest_framework import routers
from authentication.views import (AccountViewSet, 
  LoginView, LogoutView)
from expenses.views import ExpensesViewSet
from money_keep.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'expenses', ExpensesViewSet)

urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login', LoginView.as_view(), 
      name='login'),
    url(r'^api/v1/auth/logout', LogoutView.as_view(), 
      name='logout'),

    url(r'^.*$', IndexView.as_view(), name='index'),
)
