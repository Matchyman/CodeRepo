from django.urls import path

from . import views

urlpatterns = [
    path('index', views.index, name='index'),
    path('', views.loginPageRender, name = 'login'),
    path('shop', views.customerInterfaceRender, name = 'shopInterface'),
    path('bookkeeping', views.staffInterfaceRender, name = 'bookKeepingInterface')
]