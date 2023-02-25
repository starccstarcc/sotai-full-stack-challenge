from rest_framework import serializers
from .models import CPUHours

class CPUHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPUHours
        fields = '__all__'