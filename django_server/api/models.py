from django.db import models

# Create your models here.
class CPUHours(models.Model):
    cpu_hours = models.FloatField()
    logged_date = models.DateField()
