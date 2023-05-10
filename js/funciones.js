//Funcion para convertir el valor (number) a un string con formato de dinero
function convertirCLP(number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number);
}

//Al cargar la pagina carga la tabla
$(function () {

  cargarTabla()

});

/*
  Funcion para cargar la tabla
  Incluye la creacion de los botones de editar y eliminar
*/
function cargarTabla(){

  let storage = JSON.parse(localStorage.getItem("stock"));
  let tabla = $("#cuerpoTabla");
  tabla.empty();
  $.each(storage, function(index, item){
    let row = $('<tr>');
    let idEliminar;
    let idEditar;
    row.append($("<th>").text(item.id).attr("scope","row"));
    row.append($("<td>").text(item.nombre));
    row.append($("<td>").text(convertirCLP(item.precio)));
    row.append($("<td>").text(item.stock));
    let columna = $("<td>");
    let botonEditar = $("<button>");
    let botonEliminar = $("<button>");
    columna.append(botonEditar);
    columna.append(botonEliminar);
    idEliminar = item.id + "El";
    idEditar = item.id + "Ed";
    botonEliminar.attr("id", idEliminar);
    botonEliminar.click(function(){
      id = $(this).attr("id").slice(0,$(this).attr("id").length-2);
      eliminarProducto(id);
    });
    botonEditar.attr("id", idEditar);
    botonEditar.click(function(){
      id = $(this).attr("id").slice(0,$(this).attr("id").length-2);
      conseguirProducto(id);
    });
    botonEliminar.addClass("btn btn-danger btnEliminar ms-1");
    botonEditar.addClass("btn btn-primary btnEditar");
    let iconoLapiz = $("<i>");
    let iconoBasura = $("<i>");
    botonEliminar.append(iconoBasura);
    botonEditar.append(iconoLapiz);
    iconoBasura.addClass("bi bi-trash3-fill");
    iconoLapiz.addClass("bi bi-pencil-square");
    botonEditar.append(iconoLapiz);
    row.append(columna);
    
    tabla.append(row);
  });
}

//Funcion para eliminar un producto
function eliminarProducto(id){
  let tempArray = [];
  let contador = 1;
  let storage = JSON.parse(localStorage.getItem("stock"));
  for (const item of storage) {
    if (item.id != id) {
      console.log(item);
      item.id = contador;
      tempArray.push(item);
      contador = contador + 1;
    }
  }
  localStorage.setItem("stock",JSON.stringify(tempArray));
  cargarTabla();
}

//Funcion para editar un producto Parte 1
function conseguirProducto(id){
  let storage = JSON.parse(localStorage.getItem("stock"));
  let producto = storage[id-1];
  $("#edProdNombre").val(producto.nombre);
  $("#edProdPrecio").val(producto.precio);
  $("#edProdCantidad").val(producto.stock);
  $("#edProdDescripcion").val(producto.descripcion);
  $("#edProdUrlImagen").val(producto.url);
  $("#lblmodalEditar").text("Editar Producto #" + producto.id);
  $('#modalEditar').modal('show');
}

//Funcion para editar un producto Parte 2
function guardarEdicion(nombre,precio,stock,descripcion,url){
  let titulo = $("#lblmodalEditar").text();
  let id = titulo.slice(17, titulo.length);
  let storage = JSON.parse(localStorage.getItem("stock"));
  storage[id-1]={
    id: id,
    nombre: nombre.val(),
    precio: precio.val(),
    stock: stock.val(),
    descripcion: descripcion.val(),
    url: url.val()
  }
  localStorage.setItem("stock",JSON.stringify(storage));
  cargarTabla();
  reiniciarModalEditar();
  $('#modalEditar').modal('hide');
}

//Al cerrar el modal modifica los valor a lo predeterminado
$("#btnCerrarModal").on("click", function () {
  reiniciarModalEditar();
});

//Funcion de valores predeterminados del modal
function reiniciarModalEditar(){
  $("#edProdNombre").val("");
  $("#edProdPrecio").val(0);
  $("#edProdCantidad").val(0);
  $("#edProdDescripcion").val("");
  $("#edProdUrlImagen").val("");
  $("#lblmodalEditar").text("Editar Producto");
}

//Buscar en STOCK
$("#btnBuscar").on("click", function () {
  let valor = $("#txtBuscar").val().toLowerCase();
  $("table tbody tr").filter(function(){
    $(this).toggle($(this).text().toLowerCase().indexOf(valor)>-1);
  })
});

$(document).ready(cargarTienda());
function cargarTienda(){
  let tienda = $("#tiendaLlenar");
  let storage = JSON.parse(localStorage.getItem("stock"));

  $.each(storage, function(index, item){
    //COLUMNA
    let columna = $("<div>");
    tienda.append(columna);
    columna.addClass("col-md-4");
    //CARD
    let card = $("<div>");
    columna.append(card);
    card.addClass("card my-2");
    card.attr("style","width: 18rem;");
    //IMAGEN DEL CARD
    let img = $("<img>");
    card.append(img);
    img.addClass("card-img-top");
    img.attr("src",item.url);
    //CUERPO DEL CARD
    let cardBody = $("<div>");
    card.append(cardBody);
    cardBody.addClass("card-body");
    //TITULO DEL CARD
    let title = $("<h5>");
    cardBody.append(title);
    title.addClass("card-title");
    title.text(item.nombre);
    //TEXTO DEL CARD
    let text = $("<p>");
    cardBody.append(text);
    text.addClass("card-text");
    text.text(item.descripcion + " " + convertirCLP(item.precio));
    //BOTON AGREGAR
    let btnAgregar = $("<button>");
    cardBody.append(btnAgregar);
    btnAgregar.addClass("btn btn-success");
    btnAgregar.text("Agregar");
  });
}

//MODO OSCURO
$("#btnModo").on("click",function(){
  let modoClaro = $("#modoClaro");
  let modoOscuro = $("#modoOscuro");
  if (modoClaro.hasClass("d-none")) {
    modoClaro.removeClass("d-none");
    modoOscuro.addClass("d-none");
    $("body").attr("data-bs-theme", "dark");
  } else {
    modoClaro.addClass("d-none");
    modoOscuro.removeClass("d-none");
    $("body").attr("data-bs-theme", "ligth");
  }
});