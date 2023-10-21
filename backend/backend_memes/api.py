# api.py

from rest_framework import routers
from .views import MyModelViewSet
router = routers.DefaultRouter()
router.register(r'save_meme', MyModelViewSet)
