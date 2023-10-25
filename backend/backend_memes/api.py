# api.py

from rest_framework import routers
from .views import MemeViewSet
router = routers.DefaultRouter()
router.register(r'save_meme', MemeViewSet)
# router.register(r'save_meme/<int:pk>/like/',MemeViewSet)