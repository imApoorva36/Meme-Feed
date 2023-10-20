from django.urls import path, include
from .views import index
from rest_framework import routers
from .views import MyModelViewSet

router = routers.DefaultRouter()
router.register(r'save_meme', MyModelViewSet)

urlpatterns = [
    path("", index, name="index"),
    path('api/', include(router.urls)),
]
