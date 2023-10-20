from django.db import models

# Create your models here.
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Meme(models.Model):
    meme_title = models.CharField(max_length=100, null=True, blank=True)
    meme_description = models.CharField(max_length=1000, null=True, blank=True)
    meme_image = models.ImageField( default="../media/users/user_avtar.webp", null=True, blank=True, upload_to='memes/')

    def __str__(self) :
        return self.meme_title
