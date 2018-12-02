from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from graph.models import dataO
from .forms import UserRegisterForm


def register(request):
    if request.method == 'POST':
      form = UserRegisterForm(request.POST)
      if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        messages.success(request, f'Account created for {username}! login')
        return redirect('login')

    else:
      form = UserRegisterForm()
    return render(request, 'users/reg.html', {'form': form})

@login_required
def profile (request):
    context = {
      'datasets' : dataO.objects.all()
    }
    return render(request, 'users/profile.html', context)
