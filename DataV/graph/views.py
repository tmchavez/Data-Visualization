from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def home(request):
  return render(request, 'graph/frontpage.html')

def double(request):
  return render(request, 'graph/double.html')

def result(request):
  return render(request, 'graph/results.html')
