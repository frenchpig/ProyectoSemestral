$(document).ready(function(){

  //Comprobacion de que localStorage exista
  let storage = JSON.parse(localStorage.getItem("stUsuarios"));
  if (storage == null) {
    storage = [];
    localStorage.setItem("stUsuarios",JSON.stringify(storage));
  }

  //Al enviar el formulario captura
  $("#form-registro").on("submit", function(event){
    event.preventDefault();
    let pass = $("#txtContrasenna").val();
    let confirmPass = $("#txtConfirmarContrasenna").val();
    if (pass != confirmPass){
      $('#modalErrorContrasena').modal('show');
    }else{
      let storage = JSON.parse(localStorage.getItem("stUsuarios"));
      let nombre = $("#txtNombre").val();
      let correo = $("#txtEmail").val();
      storage.push({
        nombre: nombre,
        correo: correo,
        pass: pass
      });
      localStorage.setItem("stUsuarios",JSON.stringify(storage));
      window.location.replace("index.html");
    }
  })
});

$(function () {
  $("#formAgregarProductos").on("submit", function (event) {
    event.preventDefault();
    comprobarAgregarDatos();
  });

  $("#formEditarProducto").on("submit", function (event) {
    event.preventDefault();
    comprobarEditarDatos();
  });

})

function comprobarAgregarDatos(){

  //Valida el Nombre del Producto
  let nombre = $("#prodNombre");
  if (nombre.val().length == 0) {
    nombre.removeClass("is-valid");
    nombre.addClass("is-invalid");
  }else{
    nombre.removeClass("is-invalid");
    nombre.addClass("is-valid");
  }

  //Valida el Precio del Producto
  let precio = $("#prodPrecio");
  if (precio.val() == 0 || precio.val().length == 0) {
    precio.removeClass("is-valid");
    precio.addClass("is-invalid");
  }else{
    precio.removeClass("is-invalid");
    precio.addClass("is-valid");
  }
  
  //Valida la cantidad en Stock del Producto
  let stock = $("#prodCantidad");
  if (stock.val() == 0 || stock.val().length == 0) {
    stock.removeClass("is-valid");
    stock.addClass("is-invalid");
  }else{
    stock.removeClass("is-invalid");
    stock.addClass("is-valid");
  }

  //Valida la Descripcion del Producto
  let descripcion = $("#prodDescripcion");
  if (descripcion.val().length == 0) {
    descripcion.removeClass("is-valid");
    descripcion.addClass("is-invalid");
  }else{
    descripcion.removeClass("is-invalid");
    descripcion.addClass("is-valid");
  }

  //Valida el URL de la imagen del Producto
  let url = $("#prodUrlImagen");
  if (url.val().length == 0) {
    url.removeClass("is-valid");
    url.addClass("is-invalid");
  }else{
    url.removeClass("is-invalid");
    url.addClass("is-valid");
  }
  
  if(nombre.hasClass("is-valid") && precio.hasClass("is-valid") && stock.hasClass("is-valid") && descripcion.hasClass("is-valid") && url.hasClass("is-valid")){
    guardarProducto(nombre,precio,stock,descripcion,url);
  }

}

function comprobarEditarDatos(){
  //Valida el Nombre del Producto
  let nombre = $("#edProdNombre");
  if (nombre.val().length == 0) {
    nombre.removeClass("is-valid");
    nombre.addClass("is-invalid");
  }else{
    nombre.removeClass("is-invalid");
    nombre.addClass("is-valid");
  }

  //Valida el Precio del Producto
  let precio = $("#edProdPrecio");
  if (precio.val() == 0 || precio.val().length == 0) {
    precio.removeClass("is-valid");
    precio.addClass("is-invalid");
  }else{
    precio.removeClass("is-invalid");
    precio.addClass("is-valid");
  }
  
  //Valida la cantidad en Stock del Producto
  let stock = $("#edProdCantidad");
  if (stock.val() == 0 || stock.val().length == 0) {
    stock.removeClass("is-valid");
    stock.addClass("is-invalid");
  }else{
    stock.removeClass("is-invalid");
    stock.addClass("is-valid");
  }

  //Valida la Descripcion del Producto
  let descripcion = $("#edProdDescripcion");
  if (descripcion.val().length == 0) {
    descripcion.removeClass("is-valid");
    descripcion.addClass("is-invalid");
  }else{
    descripcion.removeClass("is-invalid");
    descripcion.addClass("is-valid");
  }

  //Valida el URL de la imagen del Producto
  let url = $("#edProdUrlImagen");
  if (url.val().length == 0) {
    url.removeClass("is-valid");
    url.addClass("is-invalid");
  }else{
    url.removeClass("is-invalid");
    url.addClass("is-valid");
  }
  
  if(nombre.hasClass("is-valid") && precio.hasClass("is-valid") && stock.hasClass("is-valid") && descripcion.hasClass("is-valid") && url.hasClass("is-valid")){
    guardarEdicion(nombre,precio,stock,descripcion,url);
  }
}

function guardarProducto(nombre,precio,stock,descripcion,url){
  comprobarStorage("stock");
  let storage = JSON.parse(localStorage.getItem("stock"));
  let filtro = storage.filter(e => e.nombre == nombre.val());
  if (filtro.length == 0){
    storage.push({
      id: calcularIDProducto("stock"),
      nombre: nombre.val(),
      precio: precio.val(),
      stock: stock.val(),
      descripcion: descripcion.val(),
      url: url.val()
    });
    localStorage.setItem("stock",JSON.stringify(storage));
    cargarTabla();
  }else{
    alert("producto ya registrado");
  }
  
  

}

function calcularIDProducto(key){
  let storage = JSON.parse(localStorage.getItem(key));
  if (storage.length == 0) {
    return 1
  } else {
    let id = storage.length + 1
    return id
  }
}

function comprobarStorage(key){
  let storage = localStorage.getItem(key);
  if (storage==null) {
    storage = [];
    localStorage.setItem(key,JSON.stringify(storage));
  }
}

//FUNCION DEV
function imprimirStorage(key){
  let storage = JSON.parse(localStorage.getItem(key));
  console.log(storage);
}

function eliminarStorage(key){
  localStorage.removeItem(key);
}

function crearStorageVacio(key){
  let array = [];
  localStorage.setItem(key,JSON.stringify(array));
}

$("#btnEliminarStorage").on("click", function () {
  eliminarStorage($("#keyStorage").val());
});

$("#btnMostrarStorage").on("click", function () {
  imprimirStorage($("#keyStorage2").val());
});

$("#btnCrearStorage").on("click", function () {
  crearStorageVacio($("#keyStorage3").val());
});