const carrito = JSON.parse(localStorage.getItem('carrito'));

document.addEventListener('DOMContentLoaded', function() {

  // Mostrar productos del carrito----------
  const contenedorCarrito = document.getElementById('carrito-contenedor');
  const totalElement = document.getElementById('total-compra');
  //Mostrar productos en HTML
  if (contenedorCarrito) {
    // Itera sobre los productos
    carrito.productos.forEach(producto => {
      // Crea un elemento 
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
    totalElement.textContent = `Total: $${carrito.total.toFixed(2)}`;
  }


//Simular pago--------------
function realizarPago() {
  return new Promise((resolve, reject) => {
    // Simular el proceso de pago
    setTimeout(() => {
      const exito = Math.random() < 0.8; // Simula si el pago fue exitoso
      if (exito) {
        resolve("¡Compra exitosa! Su pedido se ha procesado.");
      } else {
        reject("El pago ha fallado. Por favor, inténtelo de nuevo.");
      }
    }, 2000); // Simula una demora de 2 segundos 
  });
}

// Evento en boton de comprar--------------
const comprarBtn = document.getElementById('comprar-btn');
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
const eliminarBotones = document.querySelectorAll('.eliminar-producto');

  eliminarBotones.forEach(boton => {
    boton.addEventListener('click', function() {
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
    const indice = carrito.productos.findIndex(producto => producto.nombre === nombreProducto);
    if (indice !== -1) {
      const precioProductoEliminado = carrito.productos[indice].precio;
      carrito.total -= precioProductoEliminado;
      carrito.productos.splice(indice, 1);
      totalElement.textContent = `Total: $${carrito.total.toFixed(2)}`;
    }
  }
  
  function guardarCarritoEnLocalStorage() {
    // Guarda el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }


});  
