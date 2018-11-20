Data Visualization

Adding Depth to Data

An application that could process a set of data and then offer an audio representation of the data. The user would supply a set of data and select an interval to "play" their data. Then while their data is plotted on screen an audio is played that adjust its pitch/volume to represent each data point. Additional features could include colors running on screen at the same time to represent the rates of change in the data, and a search function that could set off a certain audio queues during playback at any specific data point.

Python Commands:

// run the server
python3 manage.py runserver

// check the database
python3 manage.py shell
from graph.models import dataO
from django.contrib.auth.models import User

// puts first object in database into data1
ex. data1 = dataO.objects.first()
    data1          // both commands show title & content of data
    data1.content
