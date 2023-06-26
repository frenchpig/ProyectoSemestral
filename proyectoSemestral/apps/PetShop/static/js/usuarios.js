let ruta = window.location.pathname;
let partes = ruta.split('/');
let token = partes[partes.length - 1];
$(function () {
  let navMas = $("#navMas");
  navMas.remove();
  let navLogReg = $("#navLogReg");
  navLogReg.remove();
  let navCarrito = $("#navCarrito");
  navCarrito.remove();
  let navOpciones = $("#navOpciones");
  navOpciones.remove();
  let navInicio = $("#navInicio");
  let navLogo = $("#navLogo");
  let link = '/user/' + token;
  navInicio.attr('href', link);
  navLogo.attr('href', link);
  let navUser = $("#navUser");
  navUser.attr('href', `/users/${token}`)
  let navStock = $("#navStock");
  navStock.attr('href', `/stock/${token}`);

  $('#formAddUser').submit(function (e) {
    e.preventDefault()



  });
})

const formulario = document.getElementById('formAddUser');
formulario.addEventListener('submit', function (event) {
  event.preventDefault();
  let username = $('#username');
  if (username.val() === '') {
    username.removeClass('is-valid').addClass('is-invalid');
  } else {
    username.removeClass('is-invalid').addClass('is-valid');
  }
  let email = $('#email');
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailValue = email.val();
  if (emailValue === '' || !regex.test(emailValue)) {
    email.removeClass('is-valid').addClass('is-invalid');
  } else {
    email.removeClass('is-invalid').addClass('is-valid');
  }
  let password = $('#password');
  if (password.val() === '') {
    password.removeClass('is-valid').addClass('is-invalid');
  } else {
    password.removeClass('is-invalid').addClass('is-valid');
  }
  let type = $('#type');
  if (type.val() == null) {
    type.removeClass('is-valid').addClass('is-invalid');
  } else {
    type.removeClass('is-invalid').addClass('is-valid');
  }


  if (username.hasClass('is-valid') && email.hasClass('is-valid') && password.hasClass('is-valid') && type.hasClass('is-valid')) {
    this.submit();
  }
});