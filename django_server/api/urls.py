from django.urls import path
from .views import hello_world, CpuHoursViewSet

urlpatterns = [
    path("hello-world/", hello_world, name="hello_world"),
    path("chart/", CpuHoursViewSet.as_view())
]
