from django.urls import path
from django.contrib.auth import views as auth_views
from .views import UserRegistrationView, MyObtainAuthToken
from .views import MyObtainAuthToken

urlpatterns = [
    path('login/', MyObtainAuthToken.as_view(), name='login'),
    path('register/', UserRegistrationView.as_view()),
]
