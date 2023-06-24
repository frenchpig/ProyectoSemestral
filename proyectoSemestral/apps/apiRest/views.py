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
  
class ComprobarStock(View):
  def get(self,request,sku):
    producto = Producto.objects.get(sku=sku)
    estado = True
    stockActual = producto.stock
    stockNuevo = stockActual - 1
    if stockNuevo<0:
      estado=False

    if estado:
      producto.stock = stockNuevo
      producto.save()
    return JsonResponse({'estado':estado})

class RetornarStock(View):
  def get(self,request,sku,cantidad):
    producto = Producto.objects.get(sku=sku)
    estado = True
    stockActual = producto.stock
    stockNuevo = stockActual + int(cantidad)
    if estado:
      producto.stock = stockNuevo
      producto.save()
    return JsonResponse({'estado':estado})
