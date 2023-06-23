$(function () {
  $("#tabla tr").each(function() {
    var fila = $(this);
    let contador = 0
    fila.find("td").each(function() {
      var celda = $(this);
      contador += 1;
      if (contador===3) {
        celda.text(convertirCLP(celda.text()))
      }
    });
  });
})



const catEliminar  = document.getElementById('delCategoria')
function reinicarModalCategoria(){
  catEliminar.value=0;
  const btnEliminar = $('#btnDelCategoria');
  btnEliminar.attr('href',"#");
}
catEliminar.addEventListener('change', function(){
  let valorSeleccionado = catEliminar.value;
  const btnEliminar = $('#btnDelCategoria');
  let link = 'deletecat/'+valorSeleccionado;
  btnEliminar.attr('href',link);
});

const formularioCat = document.getElementById('formAgregarCategorias');
formularioCat.addEventListener('submit', function(event){
  event.preventDefault();
  let categoria = $("#catNombre");
  if (categoria.val().length == 0){
    categoria.removeClass("is-valid");
    categoria.addClass("is-invalid");
  }else{
    categoria.removeClass("is-invalid");
    categoria.addClass("is-valid");
  }
  if (categoria.hasClass("is-valid")) {
    this.submit();
  }
});

const formulario = document.getElementById('formAgregarProductos');
formulario.addEventListener('submit', function(event){
  event.preventDefault();
  //Valida el Nombre del Producto
  let nombre = $("#prodNombre");
  if (nombre.val().length == 0) {
    nombre.removeClass("is-valid");
    nombre.addClass("is-invalid");
  }else{
    nombre.removeClass("is-invalid");
    nombre.addClass("is-valid");
  }
  //Valida el Precio del Producto
  const precio = $("#prodPrecio");
  if (precio.val() == 0 || precio.val().length == 0) {
    precio.removeClass("is-valid");
    precio.addClass("is-invalid");
  }else{
    precio.removeClass("is-invalid");
    precio.addClass("is-valid");
  }
  //Valida la cantidad en Stock del Producto
  let stock = $("#prodCantidad");
  if (stock.val() == 0 || stock.val().length == 0) {
    stock.removeClass("is-valid");
    stock.addClass("is-invalid");
  }else{
    stock.removeClass("is-invalid");
    stock.addClass("is-valid");
  }
  //Valida la Descripcion del Producto
  let descripcion = $("#prodDescripcion");
  if (descripcion.val().length == 0) {
    descripcion.removeClass("is-valid");
    descripcion.addClass("is-invalid");
  }else{
    descripcion.removeClass("is-invalid");
    descripcion.addClass("is-valid");
  }
  let archivo = null;
  let img = $("#prodImagen")
  if (img.val() !== "") {
    archivo = img[0].files[0];
  }
  let extPermitidas = /(.jpg|.jpeg|.png)$/i;
  if (archivo === null || !extPermitidas.exec(archivo.name)) {
    img.removeClass("is-valid");
    img.addClass("is-invalid");
  } else if (archivo !== null && extPermitidas.exec(archivo.name)) {
    img.removeClass("is-invalid");
    img.addClass("is-valid");
  }
  //Valida la categoria
  let categoria = $("#prodCategoria");
  if (categoria.val()==null){
    categoria.removeClass("is-valid");
    categoria.addClass("is-invalid");
  }else{
    categoria.removeClass("is-invalid");
    categoria.addClass("is-valid");
  }
  
  //IF de formulario completo
  if (nombre.hasClass("is-valid") && precio.hasClass("is-valid") && stock.hasClass("is-valid") && descripcion.hasClass("is-valid") && img.hasClass("is-valid") && categoria.hasClass("is-valid")) {
    this.submit();
  }
});