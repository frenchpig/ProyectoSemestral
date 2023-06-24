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
$(document).ready(function() {
  $('#formulario').validate({
    rules: {
      username: {
        required: true,
        maxlength: 20
      },
      email: {
        required: true,
        email: true,
        maxlength: 200
      },
      password: {
        required: true,
        maxlength: 15
      }
    },
    messages: {
      username: {
        required: 'Por favor, ingresa un nombre de usuario',
        maxlength: 'El nombre de usuario debe tener máximo {0} caracteres'
      },
      email: {
        required: 'Por favor, ingresa un email',
        email: 'Por favor, ingresa un email válido',
        maxlength: 'El email debe tener máximo {0} caracteres'
      },
      password: {
        required: 'Por favor, ingresa una contraseña',
        maxlength: 'La contraseña debe tener máximo {0} caracteres'
      }
    }
  });
});







