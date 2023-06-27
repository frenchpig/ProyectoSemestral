//Carga el carrito en su off canvas
function cargarCarrito() {
  comprobarStorage("carrito");
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let tabla = $("#cuerpoCarrito");
  tabla.empty();
  let totalNumerico = 0;
  $.each(carrito, function(index, item) {
    const row = $('<tr></tr>');
    tabla.append(row);
    let precioNumerico = item.precio * item.cantidad
    totalNumerico += precioNumerico;
    let precioFormato = precioNumerico.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP'
    });
    row.html(`
      <th scope="row">${index+1}</th>
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td><button onclick="eliminarCarrito(${item.sku},${item.cantidad})" id="btnEliminar${index+1}" class="btn btn-rojo"><i class="bi bi-trash3-fill"></i></button></td>
      <td>${precioFormato}</td>
    `);
  });
  const row = $('<tr></tr>');
  tabla.append(row);
  let totalFormato = totalNumerico.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP'
  });
  row.html(`
      <th scope="row">Total</th>
      <td></td>
      <td></td>
      <td></td>
      <td>${totalFormato}</td>
    `);
}

function eliminarCarrito(sku, cantidad){
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  let indice = carrito.findIndex(function(objeto){return objeto.sku===sku});
  carrito.splice(indice,1);
  localStorage.setItem("carrito",JSON.stringify(carrito));
  const toast = document.getElementById('liveToast');
  const tituloToast = document.getElementById('tituloToast');
  tituloToast.textContent = 'Producto eliminado (ㅅ´ ˘ `)'
  const bodyToast = document.getElementById('bodyToast');
  bodyToast.textContent = 'Se a eliminado un producto de tu carrito'
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
  fetch(`http://127.0.0.1:8000/api/retornarStock/${sku}/${cantidad}`)
  .then(response => response.json())
    .then(data => {
    })
    .catch(error => {
      console.log(error);
    });
  cargarCarrito();
}

const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
    })
  }


async function agregarCarrito(sku){
  let estado = await comprobarStock(sku);
  if (estado) {
    const toast = document.getElementById('liveToast');
    const tituloToast = document.getElementById('tituloToast');
    tituloToast.textContent = 'Producto Agregado! ٩(^ᗜ^ )و ´-'
    const bodyToast = document.getElementById('bodyToast');
    bodyToast.textContent = 'Se a agregado un producto a tu carrito'
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();
    fetch(`http://127.0.0.1:8000/api/producto/${sku}`)
    .then(response => response.json())
    .then(data => {
      comprobarStorage("carrito");
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      let filtro = carrito.filter(e => e.sku == data[0].pk);
      if (filtro.length == 0) {
        carrito.push({
          nombre: data[0].fields.nombre,
          precio: data[0].fields.precio,
          sku: data[0].pk,
          cantidad: 1,
        })
      }else{
        indice = carrito.findIndex(function(objeto){return objeto.sku===data[0].pk});
        let cantidad = carrito[indice].cantidad;
        cantidad = cantidad + 1;
        carrito[indice].cantidad = cantidad;
      }
      localStorage.setItem("carrito",JSON.stringify(carrito));
      cargarCarrito();
    })
    .catch(error => {
      console.log(error);
    });
  }else{
    const toast = document.getElementById('liveToast');
    const tituloToast = document.getElementById('tituloToast');
    tituloToast.textContent = 'Producto sin Stock (◡︵◡)'
    const bodyToast = document.getElementById('bodyToast');
    bodyToast.textContent = 'Se acabaron las unidades de este producto'
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();
  }
}


function comprobarStock(sku) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/api/comprobarStock/${sku}`)
      .then(response => response.json())
      .then(data => {
        resolve(data.estado); // Resuelve la promesa con el valor deseado
      })
      .catch(error => {
        console.log(error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}

function pagar(){
  arrayVacio=[];
  localStorage.setItem("carrito",JSON.stringify(arrayVacio));
  cargarCarrito();
}