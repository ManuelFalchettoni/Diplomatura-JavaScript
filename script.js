let data;

/* Productos */
fetch('productos.json')
  .then(response => response.json())
  .then(dataResponse => {
    data = dataResponse
    const listaProductos = document.getElementById('lista-productos');

    data.productos.forEach(producto => {
      // Crea elemento HTML 
      const productoElement = document.createElement('div');
      productoElement.innerHTML = `
        <h2>${producto.nombre}</h2>
        <p>Precio: $${producto.precio}</p>
        <p>${producto.descripcion}</p>
        <img>${producto.imagen}</img>
        <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
      `;

      // Agrega el producto 
      listaProductos.appendChild(productoElement);
    });

    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
      boton.addEventListener('click', function() {
        const id = boton.getAttribute('data-id');
        console.log(id)
        console.log(carrito.productos)
        agregarAlCarrito(Number(id));
      });
    }); 
  })
  .catch(error => {
    console.error('Error al obtener los productos:', error);
  });


  /* Carrito */
  const carrito = {
    productos: [],
    agregarProducto: function(producto) {
      this.productos.push(producto);
    },
    // Otras funciones del carrito, como eliminar productos, calcular el total, etc.
  };

  /* Agregar al carrito */
   function agregarAlCarrito(id) {
    const producto = data.productos.find(producto => producto.id === id);
    if (producto) {
      carrito.agregarProducto(producto);
    }
  }
  
  

  


  