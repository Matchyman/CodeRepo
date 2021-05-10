from django.db import models

# Create your models here.


#User Model

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    #Can use email field instead for 'username'
    username = models.CharField(max_length=50) 
    password = models.CharField(max_length=50)
    is_staff = models.BooleanField(default = False)
    
#Item Model



class Item(models.Model):
    #ITEM_CATERGORY_CHOICES =[]
    item_name = models.CharField(max_length=50)
    item_price = models.DecimalField(max_digits=7, decimal_places=2)
    item_quantity = models.IntegerField()





#Enumaration For Catergories



#Basket Model???