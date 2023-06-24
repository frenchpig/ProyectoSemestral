from django.urls import path
from . import views
urlpatterns = [
  path('',views.cargarInicio),
  path('user/<token>',views.cargarInicioLogged),
  path('stock',views.cargarStock),
  path('registrar',views.cargarRegistrar),
  path('login',views.cargarLogin),
  path('registrarUsuario',views.registrarUsuario, name="agregar_usuario"),
  path('agregarProducto',views.agregarProducto, name="agregar_productos"),
  path('edit/<sku>',views.cargarEdit),
  path('editarProducto/<sku>',views.editarProducto, name="editar_productos"),
  path('delete/<sku>',views.eliminarProducto),
  path('deletecat/<id>',views.eliminarCategoria),
  path('agregarCategoria',views.agregarCategoria, name="agregar_categorias"),
  path('carrito',views.comprobarStock)
]