//Script para validar la contraseña
/*
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var password = $('#password').val();
    var confirmPassword = $('#confirm-password').val();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
    } else {
      alert('Contraseña válida');
      // Aquí puedes realizar cualquier acción adicional que desees
    }
  });
});
*/



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
})