from django.urls import path
from . import views
urlpatterns = [
  path('',views.cargarInicio),
  path('stock',views.cargarStock),
  path('agregarProducto',views.agregarProducto, name="agregar_productos"),
  path('edit/<sku>',views.cargarEdit),
  path('editarProducto/<sku>',views.editarProducto, name="editar_productos"),
  path('delete/<sku>',views.eliminarProducto)
]