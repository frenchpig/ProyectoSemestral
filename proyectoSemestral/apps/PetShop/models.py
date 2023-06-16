from django.db import models

# Create your models here.

#categoria
#nombre string, id numeric

class Categoria(models.Model):
  categoria_id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=60,null=False)

  def __str__(self):
    txt = "Nombre: {0} - {1}"
    return txt.format(self.nombre,self.categoria_id)

#producto
#sku numeric, nombre string, precio numeric, stock numeric, descripcion string, url string, categoria id numeric
class Producto(models.Model):
  sku = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=44, null=False)
  precio = models.IntegerField(null=False)
  stock = models.IntegerField(null=False)
  descripcion = models.CharField(max_length=115, null=False)
  image = models.ImageField(upload_to="prodImg")
  categoria_id = models.ForeignKey(Categoria,on_delete=models.CASCADE)

  def __str__(self):
    txt = "N°{0} - Nombre: {1} - Stock: {2} "
    return txt.format(self.sku,self.nombre,self.stock)

class TipoUsuario(models.Model):
  tipo_id = models.AutoField(primary_key=True)
  nombre = models.CharField(max_length=30,null=False)
  def __str__(self):
    txt = "Tipo: {0} - N°{1}"
    return txt.format(self.nombre,self.tipo_id)

#usuario
#user string, mail string, contrasenna string, user token string
class Usuario(models.Model):
  user = models.CharField(max_length=20,primary_key=True)
  mail = models.CharField(max_length=200,null=False)
  contrasenna = models.CharField(max_length=15,null=False)
  userToken = models.CharField(max_length=30,null=False)
  tipo_id = models.ForeignKey(TipoUsuario,on_delete=models.CASCADE)
  def __str__(self):
    txt = "Usuario: {0} - Mail: {1} - Tipo: {2}"
    return txt.format(self.user,self.mail,self.tipo_id)


