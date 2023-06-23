function cargarReloj(){
  // Haciendo uso del objeto Date() obtenemos la hora, minuto y segundo 
  var fechahora = new Date();
  var hora = fechahora.getHours(); 
  var minuto = fechahora.getMinutes(); 
  var segundo = fechahora.getSeconds(); 

  // Variable meridiano con el valor 'AM' 
  var meridiano = "AM";
  
  
  // Si la hora es igual a 0, declaramos la hora con el valor 12 
  if(hora == 0){

      hora = 12;
      
  }
  
  // Si la hora es mayor a 12, restamos la hora - 12 y mostramos la variable meridiano con el valor 'PM' 
  if(hora > 12) {

      hora = hora - 12;

      // Variable meridiano con el valor 'PM' 
      meridiano = "PM";

  }
  
  // Formateamos los ceros '0' del reloj 
  hora = (hora < 10) ? "0" + hora : hora;
  minuto = (minuto < 10) ? "0" + minuto : minuto;
  segundo = (segundo < 10) ? "0" + segundo : segundo;
  
  // Enviamos la hora a la vista HTML 
  var tiempo = hora + ":" + minuto + ":" + segundo + " " + meridiano;    
  document.getElementById("relojnumerico").innerText = tiempo;
  document.getElementById("relojnumerico").textContent = tiempo;

  // Cargamos el reloj a los 500 milisegundos 
  setTimeout(cargarReloj, 500);
  
}
// Ejecutamos la función 'CargarReloj' 
cargarReloj();

//Consigue latitud y longitud para API CLIMA
function conseguirUbicacion(){
  navigator.geolocation.getCurrentPosition(function(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    climatologia(latitud,longitud);
  });
}

//Consigue los datos de API CLIMA y los muestra
function climatologia(latitud, longitud){
  fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitud+"&lon="+longitud+"&appid=ff7b27f9a6961ce877317dba39c78de8")
    .then(response => response.json())
    .then(data => {
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



//Carga el carrito en su off canvas
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

//Elimina un item completo del Carrito
function eliminarDeCarrito(id){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.splice(id,1);
  localStorage.setItem("carrito",JSON.stringify(carrito));
  cargarCarrito();
}



$(function () {
  conseguirUbicacion();
  crearDemo();
  cargarTienda();
});