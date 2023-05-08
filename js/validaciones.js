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
})