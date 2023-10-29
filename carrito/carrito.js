//Recuperamos el carrito del localStorage
const carrito = JSON.parse(localStorage.getItem('carrito'));

//Esperamos que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {

  // Buscamos los elementos en HTML
  const contenedorCarrito = document.getElementById('carrito-contenedor');
  const totalElement = document.getElementById('total-compra');
  //Buscamos el contenedor
  if (contenedorCarrito) {
    // Itera sobre los productos
    carrito.productos.forEach(producto => {
      // Crea un elemento nuevo HTML
      const productoElement = document.createElement('div');
      productoElement.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <p>${producto.garantia}</p>
        <button class="eliminar-producto">Eliminar</button> <!-- Botón de eliminar -->
      `;
     
      // Agrega el elemento del producto
      contenedorCarrito.appendChild(productoElement);
    });
    // Muestra el precio total
    totalElement.textContent = `Total: $${carrito.total.toFixed(2)}`;//Solo mostramos dos decimales
  }


//Simular pago--------------
function realizarPago() {
  return new Promise((resolve, reject) => {//Se crea una nueva promesa
    // Simular el proceso de pago
    setTimeout(() => {//Para simular el proceso de pago con una demora 
      const exito = Math.random() < 0.8; //Se genera un número aleatorio y se compara con 0.8, esto simula si el pago fue exitoso o no
      if (exito) {//Si el numero es menor a 0.8
        resolve("¡Compra exitosa! Su pedido se ha procesado.");
      } else {//Si el numero es mayor a 0.8
        reject("El pago ha fallado. Por favor, inténtelo de nuevo.");
      }
    }, 2000); // Simula una demora de 2 segundos 
  });
}

// Evento en boton de comprar--------------
const comprarBtn = document.getElementById('comprar-btn');
//Agrega un evento al boton
comprarBtn.addEventListener('click', () => {
  realizarPago()
    .then(mensaje => {
      alert(mensaje); // Muestra un mensaje de compra exitosa
    })
    .catch(error => {
      alert(error); // Muestra un mensaje de error si el pago falla
    });
});


//Eliminar del carrito ---------------
//Busco los botones de eliminar
const eliminarBotones = document.querySelectorAll('.eliminar-producto');

  eliminarBotones.forEach(boton => {
    boton.addEventListener('click', function() { //Se ejecuta una funcion cuando un usuario haga clic
      const productoElement = this.parentNode; // Elemento del producto
      const nombreProducto = productoElement.querySelector('h2').textContent; // Nombre del producto

      // Elimina el producto del HTML
      productoElement.remove();

      eliminarProductoDelCarrito(nombreProducto);
      // Actualiza el carrito en localStorage
      guardarCarritoEnLocalStorage();

    });
  });
  function eliminarProductoDelCarrito(nombreProducto) {
    //Buscamos el producto en el carrito
    const indice = carrito.productos.findIndex(producto => producto.nombre === nombreProducto);
    if (indice !== -1) { //Si lo encontramos, lo elimino; si no lo encotramos el indice seria -1;
      const precioProductoEliminado = carrito.productos[indice].precio;//Se busca el precio del producto
      carrito.total -= precioProductoEliminado;//Se resta del total el precio del producto
      carrito.productos.splice(indice, 1);//Se elimina un elemento en la posicion indicada
      totalElement.textContent = `Total: $${carrito.total.toFixed(2)}`;//Se redondea a 2 decimales el total
    }
  }
  
  function guardarCarritoEnLocalStorage() {
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }


});  
