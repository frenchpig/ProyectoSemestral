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


function comprobarPermisos(){
  let ruta = window.location.pathname;
  let partes = ruta.split('/');
  let token = partes[partes.length-1];
  let navTienda = $("#navTienda");
  let navContacto = $("#navContacto");
  let navInicio = $("#navInicio");
  let navLogo = $("#navLogo");
  navInicio.attr('href',ruta);
  navLogo.attr('href',ruta);
  let rutaTienda = ruta+"#tienda";
  let rutaContacto = ruta+"#contactos";
  navTienda.attr('href',rutaTienda);
  navContacto.attr('href',rutaContacto);
  let menuDropdown = $('#navDropdownMas');
  const opcion = `
    <li>
      <a id="navSalir" class="dropdown-item" href="/">Salir</a>
    </li>
  `;
        menuDropdown.append(opcion);
  fetch(`http://127.0.0.1:8000/api/conseguirPermisos/${token}`)
    .then(response => response.json())
    .then(data => {
      if (data.tipo==2) {
        let navLogReg = $("#navLogReg");
        let navAdmin = $("#navAdmin");
        navLogReg.remove();
        navAdmin.remove();
        
      }
      if (data.tipo==1){
        let navLogReg = $("#navLogReg");
        navLogReg.remove();
        let navStock = $("#navStock");
        navStock.attr('href',`/stock/${token}`);
        let navUser = $("#navUser");
        navUser.attr('href',`/users/${token}`)
      }
    })
    .catch(error => {
      console.log(error);
    });
}

$('#toggle').click(function() {
  const passwordInput = $('#password');
  const passwordFieldType = passwordInput.attr('type');
  
  if (passwordFieldType === 'password') {
    passwordInput.attr('type', 'text');
    $('#togglePassword i').removeClass('bi-eye').addClass('bi-eye-slash');
  } else {
    passwordInput.attr('type', 'password');
    $('#togglePassword i').removeClass('bi-eye-slash').addClass('bi-eye');
  }
});

$('#btnOpciones').click(function(){
  $('#userEditModal').modal('show');
});

$('#btnGuardarCambios').click(function () {
  let email = $('#email');
  let password = $('#password');
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let correoValido = false;
  if (regex.test(email.val())) {
    correoValido = true;
  }
  if (email.val().length == 0) {
    email.removeClass("is-valid");
    email.addClass("is-invalid");
  } else if (!correoValido) {
    email.removeClass("is-valid");
    email.addClass("is-invalid");
  } else {
    email.removeClass("is-invalid");
    email.addClass("is-valid");
  }

  if (password.val().length == 0) {
    password.removeClass("is-valid");
    password.addClass("is-invalid");
  } else {
    password.removeClass("is-invalid");
    password.addClass("is-valid");
  }

  if(email.hasClass("is-valid")&&password.hasClass("is-valid")){
    $('#userEditForm').submit();
  }

});

$(function () {
  conseguirUbicacion();
  cargarCarrito();
  comprobarPermisos();
});