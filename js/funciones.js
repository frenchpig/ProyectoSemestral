function convertirCLP(number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number);
}

/*<button href="#" class="btn btn-primary btnEditar">
              <i class="bi bi-pencil-square"></i> 
            </button>*/

$(function () {

  cargarTabla()

});

function cargarTabla(){

  let storage = JSON.parse(localStorage.getItem("stock"))
  let tabla = $("#cuerpoTabla");
  tabla.empty();
  $.each(storage, function(index, item){
    let row = $('<tr>');

    row.append($("<th>").text(item.id).attr("scope","row"));
    row.append($("<td>").text(item.nombre));
    row.append($("<td>").text(convertirCLP(item.precio)));
    row.append($("<td>").text(item.stock));
    let columna = $("<td>");
    let botonEditar = $("<button>");
    let botonEliminar = $("<button>");
    columna.append(botonEditar);
    columna.append(botonEliminar);
    botonEliminar.addClass("btn");
    botonEliminar.addClass("btn-danger");
    botonEliminar.addClass("btnEliminar");
    botonEliminar.addClass("ms-1");
    botonEditar.addClass("btn");
    botonEditar.addClass("btn-primary");
    botonEditar.addClass("btnEditar");
    let iconoLapiz = $("<i>");
    let iconoBasura = $("<i>");
    botonEliminar.append(iconoBasura);
    botonEditar.append(iconoLapiz);
    iconoBasura.addClass("bi");
    iconoBasura.addClass("bi-trash3-fill");
    iconoLapiz.addClass("bi");
    iconoLapiz.addClass("bi-pencil-square");
    botonEditar.append(iconoLapiz);
    row.append(columna);
    
    tabla.append(row);
  });
}