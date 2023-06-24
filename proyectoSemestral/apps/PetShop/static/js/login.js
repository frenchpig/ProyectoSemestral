$(document).ready(function () {
  let navMas = $("#navMas");
  navMas.remove();
  let navLogReg = $("#navLogReg");
  navLogReg.remove();
  let navCarrito = $("#navCarrito");
  navCarrito.remove();
  let navAdmin = $("#navAdmin");
  navAdmin.remove();
});
const formulario = document.getElementById('loginForm');
formulario.addEventListener('submit',async function(event){
  event.preventDefault();

  let nombre = $("#username");
  if (nombre.val().length == 0) {
    nombre.removeClass("is-valid");
    nombre.addClass("is-invalid");
  }else{
    nombre.removeClass("is-invalid");
    nombre.addClass("is-valid");
  }

  let password = $("#password");
  if (password.val().length == 0) {
    password.removeClass("is-valid");
    password.addClass("is-invalid");
  }else{
    password.removeClass("is-invalid");
    password.addClass("is-valid");
  }
  //IF de formulario completo
  if (nombre.hasClass("is-valid")&&nombre.hasClass("is-valid")) {
    //this.submit();
    let estado = await consultarUsuario(nombre.val(),password.val())
    if (estado) {
      let token = await conseguirToken(nombre.val())
      window.location.href = `/user/${token}`
    }else{
      const toast = document.getElementById('liveToast');
      const tituloToast = document.getElementById('tituloToast');
      tituloToast.textContent = 'No se pudo ingresar! ꃋᴖꃋ'
      const bodyToast = document.getElementById('bodyToast');
      bodyToast.textContent = 'Tu usuario o contraseña son incorrectos, intenta otra vez!'
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
      toastBootstrap.show();
      password.removeClass("is-valid");
      password.addClass("is-invalid");
      nombre.removeClass("is-valid");
      nombre.addClass("is-invalid");
    }
  }
});

function conseguirToken(user){
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/api/conseguirToken/${user}`)
      .then(response => response.json())
      .then(data => {
        resolve(data.token);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

function consultarUsuario(user,password){
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/api/consultarUsuario/${user}/${password}`)
      .then(response => response.json())
      .then(data => {
        resolve(data.estado);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}