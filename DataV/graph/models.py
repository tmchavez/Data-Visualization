from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.
class dataO(models.Model):
    title = models.CharField(max_length = 100)
    xaxis = models.TextField()
    yaxis = models.TextField(default = "")
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('graph-home')
