from django.urls import path
from . import views
urlpatterns = [
    path('productos/',views.ObtenerProductos.as_view()),
    path('producto/<sku>/',views.ObtenerProductoId.as_view()),
    path('comprobarStock/<sku>/',views.ComprobarStock.as_view()),
    path('retornarStock/<sku>/<cantidad>/',views.RetornarStock.as_view()),
    path('consultarUsuario/<user>/<password>/',views.validarUsuario.as_view()),
    path('conseguirToken/<user>',views.conseguirToken.as_view()),
    path('conseguirPermisos/<token>',views.consultarPermiso.as_view())
]