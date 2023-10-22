from django.db import models
from django.contrib.auth.models import User

# Create your models here.
def upload_to(instance, filename):
    return 'memes/{filename}'.format(filename=filename)

class Meme(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="memes")
    meme_title = models.CharField(max_length=100, null=True, blank=True)
    meme_description = models.CharField(max_length=1000, null=True, blank=True)
    top_text = models.CharField(max_length=100, null=True, blank=True)
    buttom_text = models.CharField(max_length=100, null=True, blank=True)
    meme_image = models.ImageField(null=True, blank=True, upload_to='memes/')
    likes = models.IntegerField(default=0)

    def __str__(self) :
        return self.meme_title
