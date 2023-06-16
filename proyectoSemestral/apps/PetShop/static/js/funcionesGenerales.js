//JS DE FUNCIONES GENERALES UTILIZADAS POR TODO EL PROYECTO

//Comprueba la existencia de un Storage
function comprobarStorage(key){
  let storage = localStorage.getItem(key);
  if (storage==null) {
    storage = [];
    localStorage.setItem(key,JSON.stringify(storage));
  }
}

//Convierte numeros en formato CLP
function convertirCLP(number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number);
}

//Cambia a Modo Oscuro toda la pagina
$("#btnModo").on("click",function(){
  let modoClaro = $("#modoClaro");
  let modoOscuro = $("#modoOscuro");
  if (modoClaro.hasClass("d-none")) {
    modoClaro.removeClass("d-none");
    modoOscuro.addClass("d-none");
    $("body").attr("data-bs-theme", "dark");
  } else {
    modoClaro.addClass("d-none");
    modoOscuro.removeClass("d-none");
    $("body").attr("data-bs-theme", "ligth");
  }
});

//Cambia el boton del modo oscuro al color contrario de la pagina para resaltar
function cambiarColor(){
  let boton = document.getElementById("btnModo");
  if (boton.classList.contains("btn-negro")) {
    boton.classList.replace("btn-negro","btn-blanco");
  }else{
    boton.classList.replace("btn-blanco","btn-negro");
  }
}

//Consigue un producto basandose en la ID (SKU) que tenga en el STORAGE
function conseguirProductoPorId(id){
  return function(obj){
    return obj.id == id;
  }
}