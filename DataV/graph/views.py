from django.shortcuts import render
from django.http import HttpResponse
from .models import dataO
from django.contrib.auth.models import User
from django.core import serializers
from django.views.generic import ListView, DetailView, CreateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

# Create your views here.



def home(request):
  context = {
    'datasets' : dataO.objects.all()
  }
  return render(request, 'graph/frontpage.html', context)

class DataListView(ListView):
    model = dataO
    template_name = 'graph/frontpage.html'
    context_object_name = 'datasets'

class DataDetailView(DetailView):
    model = dataO

class DataCreateView(LoginRequiredMixin, CreateView):
    model = dataO
    fields = ['title','xaxis','yaxis']

    def form_valid(self,form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class DataDeleteView( DeleteView):
    model = dataO
    success_url = '/graph/'

    #def test_func(self):
    #    if self.request.user == dataO.author:
    #      return True
    #    return False

def double(request):
  return render(request, 'graph/double.html')

def result(request):
  #json_serializer = serializers.get_serializer("json")()
  context = {
    'datasets' : dataO.objects.all()
  }
  return render(request, 'graph/results.html',context)
