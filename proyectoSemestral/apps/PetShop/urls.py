from django.urls import path
from . import views
urlpatterns = [
  path('',views.cargarInicio),
  path('user/<token>',views.cargarInicioLogged),
  path('stock/<token>',views.cargarStock),
  path('registrar',views.cargarRegistrar),
  path('login',views.cargarLogin),
  path('registrarUsuario',views.registrarUsuario, name="agregar_usuario"),
  path('modificarUsuario/<token>',views.modificarUsuario),
  path('eliminarUsuario/<token>',views.eliminarUsuario),
  path('agregarProducto/<token>',views.agregarProducto, name="agregar_productos"),
  path('edit/<sku>/<token>',views.cargarEdit),
  path('editarProducto/<sku>/<token>',views.editarProducto, name="editar_productos"),
  path('delete/<sku>/<token>',views.eliminarProducto),
  path('deletecat/<id>/<token>',views.eliminarCategoria),
  path('agregarCategoria/<token>',views.agregarCategoria, name="agregar_categorias"),
  path('carrito',views.comprobarStock),
  path('users/<token>',views.cargarUsuarios),
  path('addUsers/<token>',views.agregarUsuario),
  path('deleteUser/<token>/<username>',views.eliminarUsuarioAdmin),
  path('editUser/<token>/<username>',views.cargarEditarUser),
  path('saveEditUser/<token>/<username>',views.saveEditUsuario)
]