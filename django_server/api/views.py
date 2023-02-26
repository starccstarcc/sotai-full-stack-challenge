from django.db import models
from django.http import JsonResponse
from django.db.models.functions import ExtractYear, ExtractMonth, ExtractDay
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .models import CPUHours
from .serializers import CPUHoursSerializer

import pandas


@api_view(["GET"])
def hello_world(request):
    return Response("Hello, World!", status=status.HTTP_200_OK)


class CpuHoursViewSet(APIView):
    def post(self, request):
        csvData = pandas.read_csv('./cpu_hours.csv')
        temp = []
        print(len(csvData))
        for i, j in csvData.iterrows():
            temp.append({
                'cpu_hours': j.cpu_hours,
                'logged_date': datetime(int(j.year), int(j.month), int(j.day)).date()
            })
            if(i > 0 and i % 1000 == 0 or i == len(csvData) - 1):
                serializer = CPUHoursSerializer(data=temp, many=True)
                if serializer.is_valid(raise_exception=True):
                    try:
                        serializer.create(serializer.validated_data)
                    except Exception as e:
                        print("Error: %s" % e)

        return Response("created", status=status.HTTP_201_CREATED)

    def get(self, request):
        view_type = request.GET.get('view_type')
        from_date = request.GET.get('from')
        to_date = request.GET.get('to')

        if view_type == 'Yearly':
            queryset = CPUHours.objects.filter(date__range=[from_date, to_date]).annotate(period=ExtractYear(
                'date')).values('period').annotate(count=models.Count('id')).values('period', 'count')
        elif view_type == 'Monthly':
            queryset = CPUHours.objects.filter(date__range=[from_date, to_date]).annotate(period=ExtractMonth(
                'date')).values('period').annotate(count=models.Count('id')).values('period', 'count')
        elif view_type == 'Daily':
            queryset = CPUHours.objects.filter(date__range=[from_date, to_date]).annotate(period=ExtractDay(
                'date')).values('period').annotate(count=models.Count('id')).values('period', 'count')
        else:
            raise ValueError('Invalid view type')

        # Do something with the queryset, for example serialize it to JSON
        data = list(queryset)

        return JsonResponse({'data': data})
