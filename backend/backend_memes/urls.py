from django.urls import path, include
from . import views
from .views import index
from rest_framework import routers
from .views import MyModelViewSet
from .api import router
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/user/', UserAPIView.as_view(), name='user'),
    path('api/register/', views.register, name='register'),
    path('api/token/verify/', views.verify_token, name='verify_token'),
    path('api/logout/', views.custom_logout, name='custom_logout'),
    path('api/', include(router.urls)),
    # path("<path:path>", index, name="index"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)