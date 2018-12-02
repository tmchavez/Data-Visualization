from django.urls import path
from . import views
from .views import DataListView, DataDetailView, DataCreateView, DataDeleteView

urlpatterns = [
  path('', DataListView.as_view(), name= 'graph-home'),
  path('data/<int:pk>/', DataDetailView.as_view(), name= 'graph-detail'),
  path('data/new/', DataCreateView.as_view(), name= 'graph-create'),
  path('double/', views.double, name= 'graph-double'),
  path('result/', views.result, name = 'graph-result'),
  path('data/<int:pk>/delete/', DataDeleteView.as_view(), name= 'graph-delete'),

]
