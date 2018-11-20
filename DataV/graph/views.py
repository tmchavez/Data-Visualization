from django.shortcuts import render
from django.http import HttpResponse
from .models import dataO
from django.contrib.auth.models import User
from django.core import serializers

# Create your views here.

datas = [
  {
    'author' : 'tmchavez',
    'title' : 'test 1',
    'content' : '1 4 7 9 5',
  },
  {
    'author' : 'tmchavez',
    'title' : 'test 2',
    'content' : '11 14 27 49 35',
  }
]

def home(request):
  context = {
    'datasets' : dataO.objects.all()
  }
  return render(request, 'graph/frontpage.html', context)

def double(request):
  return render(request, 'graph/double.html')

def result(request):
  json_serializer = serializers.get_serializer("json")()
  context = {
    'datasets' : json_serializer.serialize(dataO.objects.all(), ensure_ascii=False)
  }
  return render(request, 'graph/results.html',context)
