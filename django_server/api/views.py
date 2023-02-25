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
            if(i>0 and i % 1000 == 0 or i == len(csvData) - 1) :
                serializer = CPUHoursSerializer(data=temp, many=True)
                if serializer.is_valid(raise_exception=True):
                    try:
                        serializer.create(serializer.validated_data)
                    except Exception as e:
                        print("Error: %s" % e)

        return Response("created", status=status.HTTP_201_CREATED)
