from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def home(request):
  return render(request, 'graph/frontpage.html')

def result(request):
  return HttpResponse('<h1> graph results </h1>')
