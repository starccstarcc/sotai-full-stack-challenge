from django.urls import path
from django.contrib.auth import views as auth_views
from .views import UserSignupView, MyObtainAuthToken
from .views import MyObtainAuthToken
from .views import ApiAuthLogin

urlpatterns = [
    path('login/', MyObtainAuthToken.as_view()),
    path('currentuser/', ApiAuthLogin.as_view()),
    path('signup/', UserSignupView.as_view()),
]
