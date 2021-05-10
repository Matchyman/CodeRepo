from django import forms
from .models import *



#Login Form
class LoginForm(forms.Form):
    
    username = forms.CharField(label = "Username", max_length = 100)
    password = forms.CharField(widget = forms.PasswordInput(),label = "Password", max_length = 100)


class UserCreate(forms.ModelForm):
    
    class Meta:
        model = User
        fields = ("first_name","last_name","username","password")
