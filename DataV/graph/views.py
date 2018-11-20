from django.shortcuts import render
from django.http import HttpResponse
from .models import dataO
from django.contrib.auth.models import User

# Create your views here.

def home(request):
  context = {
    'datasets': dataO.objects.all()
  }
  return render(request, 'graph/frontpage.html', context)

def double(request):
  return render(request, 'graph/double.html')

def result(request):
  return render(request, 'graph/results.html')
