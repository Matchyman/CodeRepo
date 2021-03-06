from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import *
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

#Login Page Logic
def loginPageRender(request): 
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            username = (form.cleaned_data['username'])
            password = (form.cleaned_data['password'])
            y = User.objects.filter(username = username)
            for x in y:
                if(x.password == password):
                    if (x.is_staff == False):
                        return redirect('/shop')
                    else:
                        return redirect('/bookkeeping')
                else:
                    pass
        else:
            pass
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form':form})

def customerInterfaceRender(request):
    if request.method == "POST":
        pass


    items = Item.objects.all();
    return render(request,'customer_interface.html', {'items': items})

def staffInterfaceRender(request):
    return render(request, 'staff_interface.html')
