# Generated by Django 2.1.2 on 2018-12-02 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graph', '0003_auto_20181202_0313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datao',
            name='yaxis',
            field=models.TextField(default=''),
        ),
    ]