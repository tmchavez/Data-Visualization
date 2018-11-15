from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name= 'graph-home'),
  path('double/', views.double, name= 'graph-double'),
  path('result/', views.result, name = 'graph-result'),

]
