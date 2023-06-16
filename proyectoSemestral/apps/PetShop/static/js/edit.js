const formulario = document.getElementById('formEditarProductos');
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
  let img = $("#prodImagen")
  img.removeClass("is-invalid");
  img.addClass("is-valid");
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