from rest_framework import serializers
from .models import Meme
from django.contrib.auth import get_user_model

class MemeSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Meme
        fields = ['id', 'meme_title', 'meme_description', 'meme_image', 'owner']

