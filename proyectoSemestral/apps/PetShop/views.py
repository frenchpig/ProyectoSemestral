from django.shortcuts import render, redirect
from .models import *
import os
from django.conf import settings

# Create your views here.

def cargarInicio(request):
  return render(request, "inicio.html")

def cargarStock(request):
  categorias = Categoria.objects.all()
  productos = Producto.objects.all()
  return render(request, "stock.html",{"cates":categorias,"prod":productos})

#Funcion para agregar producto + sus validaciones
def agregarProducto(request):
  estado = True
  #Comprobacion de nombre
  v_nombre = request.POST['prodNombre']
  if len(v_nombre)==0:
    estado=False
  #Comprobacion de precio
  v_precio = request.POST['prodPrecio']
  if len(v_precio)==0:
    estado=False
  elif int(v_precio)<=0:
    estado=False
  #Comprobacion de stock
  v_stock = request.POST['prodCantidad']
  if len(v_stock)==0:
    estado=False
  elif int(v_stock)<=0:
    estado=False
  #Comprobacion de categoria
  try:
    v_categoria = Categoria.objects.get(categoria_id=request.POST['prodCategoria'])
  except:
    estado=False
  #Comprobacion de descripcion
  v_descripcion = request.POST['prodDescripcion']
  if len(v_descripcion)==0:
    estado=False
  #Comprobacion de imagen
  try:
    v_image = request.FILES['prodImagen']
  except:
    estado=False
  if estado:
    Producto.objects.create(nombre=v_nombre,precio=v_precio,stock=v_stock,descripcion=v_descripcion,image=v_image,categoria_id=v_categoria)
  return redirect('/stock')


def cargarEdit(request,sku):
  categorias = Categoria.objects.all()
  producto = Producto.objects.get(sku=sku)
  categoria=producto.categoria_id
  categoriaId=Categoria.objects.get(categoria_id=categoria.categoria_id).categoria_id

  return render(request, "edit.html",{"cates":categorias,"prod":producto,"cateProd":categoriaId})

def editarProducto(request,sku):
  estado = True
  productoBD = Producto.objects.get(sku = sku)
  #Comprobacion de nombre
  v_nombre = request.POST['prodNombre']
  if len(v_nombre)==0:
    estado=False
  #Comprobacion de precio
  v_precio = request.POST['prodPrecio']
  if len(v_precio)==0:
    estado=False
  elif int(v_precio)<=0:
    estado=False
  #Comprobacion de stock
  v_stock = request.POST['prodCantidad']
  if len(v_stock)==0:
    estado=False
  elif int(v_stock)<=0:
    estado=False
  #Comprobacion de categoria
  try:
    v_categoria = Categoria.objects.get(categoria_id=request.POST['prodCategoria'])
  except:
    estado=False
  #Comprobacion de descripcion
  v_descripcion = request.POST['prodDescripcion']
  if len(v_descripcion)==0:
    estado=False
  try:
    v_image = request.FILES['prodImagen']
    ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.image))
    os.remove(ruta_imagen)
  except:
        v_image = productoBD.image

  if estado:
    print("Pass: Producto editado exitosamente")
    productoBD.nombre = v_nombre
    productoBD.descripcion = v_descripcion
    productoBD.stock = v_stock
    productoBD.precio = v_precio
    productoBD.image = v_image
    productoBD.categoria_id = v_categoria
    productoBD.save()
  else:
    print("Error: No se ha podido editar el producto")

  return redirect('/stock')

def eliminarProducto(request,sku):
  productoBD = Producto.objects.get(sku=sku)
  ruta_imagen = os.path.join(settings.MEDIA_ROOT, str(productoBD.image))
  os.remove(ruta_imagen)
  productoBD.delete()
  return redirect('/stock')

def agregarCategoria(request):
  estado = True
  v_nombre = request.POST['catNombre']
  if len(v_nombre)==0:
    estado=False
  if estado:
    Categoria.objects.create(nombre=v_nombre)
  return redirect('/stock')

def eliminarCategoria(request,id):
  categoriaBD = Categoria.objects.get(categoria_id=id)
  categoriaBD.delete()
  return redirect('/stock')