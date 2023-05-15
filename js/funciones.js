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
    botonEliminar.addClass("btn btn-rojo btnEliminar ms-1");
    botonEditar.addClass("btn btn-azul btnEditar");
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
  let storage = JSON.parse(localStorage.getItem("stock"));
  for (const item of storage) {
    if (item.id != id) {
      tempArray.push(item);
    }
  }
  localStorage.setItem("stock",JSON.stringify(tempArray));
  cargarTabla();
}

//Funcion para conseguir el objeto mediante la ID
function conseguirProductoPorId(id){
  return function(obj){
    return obj.id == id;
  }
}

//Funcion para editar un producto Parte 1
function conseguirProducto(id){
  let storage = JSON.parse(localStorage.getItem("stock"));
  let indice = storage.findIndex(conseguirProductoPorId(id));
  let producto = storage[indice];
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
  let indice = storage.findIndex(conseguirProductoPorId(id));
  storage[indice]={
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
    //Test
    let sku = $("<p>");
    card.append(sku);
    sku.text("SKU: "+ item.id);
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
    btnAgregar.addClass("btn btn-verde");
    btnAgregar.text("Agregar");
    let idAgregar = item.id + "Ag"
    btnAgregar.attr("id",idAgregar)
    btnAgregar.click(function(){
      id = $(this).attr("id").slice(0,$(this).attr("id").length-2);
      agregarCarrito(id);
    });
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

function cambiarColor(){
  let boton = document.getElementById("btnModo");
  if (boton.classList.contains("btn-negro")) {
    boton.classList.replace("btn-negro","btn-blanco");
  }else{
    boton.classList.replace("btn-blanco","btn-negro");
  }
}

/*<tr>
            <th scope="row">1</th>
            <td>Comida de Perro (Pollo)</td>
            <td><input class="col-4" type="number"></td>
            <td><button class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button></td>
            <td>$43.000</td>
          </tr> */

function cargarCarrito(){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let tabla = $("#cuerpoCarrito");
  tabla.empty();
  $.each(carrito, function(index, item){
    //Crea la Fila
    let row = $('<tr>');
    //Consigue la poscicion en la que deberia estar el item
    let poscicion = index + 1;
    //Agrega la poscicon a la fila
    row.append($("<th>").text(poscicion).attr("scope","row"));
    //Agrega el nombre a la fila
    row.append($("<td>").text(item.nombre));
    //Agrega la cantidad a la fila
    let cantidad = $("<td>");
    row.append(cantidad);
    let input = $("<input>");
    cantidad.append(input);
    input.addClass("form-control");
    input.attr("type","number");
    input.val(item.cantidad);
    //Agrega el boton de Eliminar a la fila
    let colEliminar = $("<td>");
    row.append(colEliminar);
    let btnEliminar = $("<button>");
    colEliminar.append(btnEliminar);
    let idEliminar = index + "El";
    btnEliminar.attr("id", idEliminar);
    btnEliminar.click(function(){
      id = $(this).attr("id").slice(0,$(this).attr("id").length-2);
      eliminarDeCarrito(id);
    });
    btnEliminar.addClass("btn btn-rojo");
    let iconoEliminar = $("<i>");
    btnEliminar.append(iconoEliminar)
    iconoEliminar.addClass("bi bi-trash3-fill");
    //Agrega el total a la fila
    row.append($("<td>").text(convertirCLP(item.total)));
    
    //Agrega la fila a la tabla
    tabla.append(row);
  })

  let row = $('<tr>');
  let total = 0;
  $.each(carrito, function(index, item){
    total = total + parseInt(item.total);
  })
  row.append($("<th>").text("Total").attr("scope","row"));
  row.append($("<td>").text(""));
  row.append($("<td>").text(""));
  row.append($("<td>").text(""));
  row.append($("<td>").text(convertirCLP(total)));

  tabla.append(row);


}

function eliminarDeCarrito(id){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.splice(id,1);
  localStorage.setItem("carrito",JSON.stringify(carrito));
  cargarCarrito();
}

//Agregar Al Carrito
function agregarCarrito(id){
  comprobarStorage("carrito");
  let stock = JSON.parse(localStorage.getItem("stock"));
  let indice = stock.findIndex(conseguirProductoPorId(id));
  let producto = stock[indice];
  let carrito = JSON.parse(localStorage.getItem("carrito"));

  let filtro = carrito.filter(e => e.nombre == producto.nombre);
  if (filtro.length == 0) {
    carrito.push({
      nombre: producto.nombre,
      precio: producto.precio,
      id: producto.id,
      cantidad: 1,
      total: producto.precio
    })
  } else {
    indice = carrito.findIndex(conseguirProductoPorId(id));
    let precio = carrito[indice].precio;
    let cantidad = carrito[indice].cantidad;
    let total = carrito[indice].total;
    cantidad = cantidad + 1;
    total = cantidad * precio;
    carrito[indice].cantidad = cantidad;
    carrito[indice].total = total;
  }
  localStorage.setItem("carrito",JSON.stringify(carrito));
  cargarCarrito();
}

$("index").ready(function () {
  cargarCarrito();
  conseguirUbicacion();
  crearDemo();
});

function conseguirUbicacion(){
  navigator.geolocation.getCurrentPosition(function(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    climatologia(latitud,longitud);
  });
}

function climatologia(latitud, longitud){
  fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitud+"&lon="+longitud+"&appid=f585e03e11ba7f51927394fe524a29f1")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let kelvin = 273.15;
      let temperaturaActual = Math.trunc(data.main.temp - kelvin); 
      let texto = $("#temperaturaActual");
      let icono = data.weather[0].icon;
      let url = "https://openweathermap.org/img/wn/"+ icono +"@2x.png"
      let imagen = $("#iconoTemperatura");
      imagen.attr("src", url);
      texto.text(temperaturaActual + "°C ");
    })
}

function crearDemo(){
  let stock = JSON.parse(localStorage.getItem("stock"));
  if (stock.length == 0) {
    stock.push({
      id: 1,
      nombre: "Comida Perruna",
      precio: 43000,
      stock: 20,
      descripcion: "Comida para perros de alta calidad con ingredientes naturales y nutritivos para una dieta equilibrada y sabor irresistible. ¡Tu perro lo amará!",
      url: "https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dw6832e6f1/images/Dog%20Adult%20Mini%20-%20sabor%20pollo%20y%20arroz%20cafe.jpg"
    },{
      id: 2,
      nombre: "Comida Gatuna",
      precio: 23000,
      stock: 20,
      descripcion: "Comida para gatos de calidad premium con proteínas de origen animal y nutrientes esenciales para una salud óptima y un sabor irresistible. ¡A tu gato le encantará!",
      url: "https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dw8a8b6892/images/Cat%20Adult%20Sterilized%20-%20sabor%20pollo%20y%20arroz.jpg"
    },{
      id: 3,
      nombre: "Comida de Pajarito",
      precio: 30000,
      stock: 20,
      descripcion: "Deliciosa comida para pájaros con una mezcla única de semillas y frutas para satisfacer sus necesidades nutricionales y hacer que canten de alegría. ¡Un festín para tu ave!",
      url: "https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/default/dw388b10dd/images/68622-ac-56a61.jpg"
    });
    localStorage.setItem("stock",JSON.stringify(stock));
  }
}