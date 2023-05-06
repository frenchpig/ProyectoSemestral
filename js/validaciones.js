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