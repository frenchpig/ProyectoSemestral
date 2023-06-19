from django.shortcuts import render
from apps.PetShop.models import *

from django.http import JsonResponse
from django.views import View
from django.core import serializers
import json

# Create your views here.
class ObtenerProductos(View):
  def get(self,request):
    productos = Producto.objects.all()
    return JsonResponse(list(productos.values()),safe=False,json_dumps_params={'indent' : 2})

class ObtenerProductoId(View):
  def get(self,request,sku):
    producto = Producto.objects.get(sku=sku)
    return JsonResponse(json.loads(serializers.serialize('json', [producto])),safe=False,json_dumps_params={'indent' : 2})
