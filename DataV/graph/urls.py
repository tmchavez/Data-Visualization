from django.urls import path
from . import views

urlpatterns = [
  path('', views.home, name= 'graph-home'),
  path('results/', views.result, name = 'graph-result'),

]
