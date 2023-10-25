document.addEventListener('DOMContentLoaded', function() {
    // Otras configuraciones y funciones
  
    function mostrarCarritoEnPagina() {
      const carritoContenido = document.getElementById('carrito-contenido');
      carritoContenido.innerHTML = ''; // Limpia el contenido actual
  
      // Itera sobre los productos en el carrito y muestra cada uno
      carrito.productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <!-- Otros detalles del producto si es necesario -->
        `;
        carritoContenido.appendChild(productoElement);
      });
  
      // Actualiza el subtotal y total si es necesario
      // Llama a funciones adicionales para realizar otras tareas, si es necesario
    }
  
    mostrarCarritoEnPagina(); // Muestra el contenido del carrito al cargar la página
  });