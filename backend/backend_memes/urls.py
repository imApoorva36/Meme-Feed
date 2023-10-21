from django.urls import path, include
from . import views
from .views import index
from rest_framework import routers
from .views import MyModelViewSet
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()
router.register(r'save_meme', MyModelViewSet)

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/user/', UserAPIView.as_view(), name='user'),
    path('api/register/', views.register, name='register'),
    path('api/token/verify/', views.verify_token, name='verify_token'),
    path('api/logout/', views.custom_logout, name='custom_logout'),
    # path('api/', include(router.urls)),
    path("<path:path>", index, name="index"),
]