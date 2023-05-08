$(document).ready(function(){
  $("#form-registro").on("submit", function(event){
    event.preventDefault();
    console.log("handler submit llamado");
    let pass = $("#txtContrasenna").val();
    let confirmPass = $("#txtConfirmarContrasenna").val();
    console.log(pass);
    console.log(confirmPass);
    if (pass != confirmPass){
      $('#modalErrorContrasena').modal('show'); 
    }
  })
});

$(function () {
  $("#formAgregarProductos").on("submit", function (event) {
    event.preventDefault();
    console.log("handler submit llamado");
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

    console.log(nombre.hasClass("is-valid"));
    console.log(precio.hasClass("is-valid"));
    console.log(stock.hasClass("is-valid"));
    console.log(descripcion.hasClass("is-valid"));
    console.log(url.hasClass("is-valid"));
    
    if(nombre.hasClass("is-valid") && precio.hasClass("is-valid") && stock.hasClass("is-valid") && descripcion.hasClass("is-valid") && url.hasClass("is-valid")){
      guardarProducto(nombre,precio,stock,descripcion,url);
    }

  });
})

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