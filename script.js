let data;
/* Productos */
fetch('productos.json')//Realizamos una solicitud al archivo JSON
  .then(response => response.json())//Convierte el contenido JSON en un objeto JavaScript
  .then(dataResponse => {  //se asigna el objeto JSON a la variable dataResponse
    data = dataResponse
    const listaProductos = document.getElementById('lista-productos');//Se busca el contenedor en el HTML

    data.productos.forEach(producto => { //Se recorren todos los productos
      // Crea elemento HTML 
      const productoElement = document.createElement('div');
      //Se especifica el cotenido nuevo del elemnto HTML
      productoElement.innerHTML = ` 
        <h2><a href="productos/producto${producto.id}.html">${producto.nombre}</a></h2>
        <p>Precio: $${producto.precio}</p>
        <p>${producto.descripcion}</p>
        <img>${producto.imagen}</img>
        <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
      `;

      // Agrega el producto 
      listaProductos.appendChild(productoElement);
    });
    
    //Boton para agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');//se seleccionan todos los elementos HTML que tienen la clase "agregar-carrito"
    botonesAgregarCarrito.forEach(boton => {
      boton.addEventListener('click', function() { //Se ejecuta una funcion cuando un usuario haga clic
        const id = boton.getAttribute('data-id'); //se obtiene el "data-id" del botón en el que se hizo clic
        agregarAlCarrito(Number(id));//Se llama  una funcion pasandole como argumento el identificador del boton
      });
    }); 
  })
  .catch(error => { //Si ocurre un error al recuperar los datos
    console.error('Error al obtener los productos:', error);
  });


  /*Creación del Carrito */
  const carrito = {
    productos: [],//Creamos un array para guardas los "productos"
    total: 0,//Iniciamos el precio total en cero
    agregarProducto: function(producto) { //Se crea un metodo dentro del objeto que contiene un funcion
      this.productos.push(producto);//"This" hace referencia a "carrito", luego se utiliza PUSH para agregar el producto(argumento) a productos(array) contenido en el carrito
    },
    
  };

  /* Agregar al carrito */
   function agregarAlCarrito(id) {
    const producto = data.productos.find(producto => producto.id === id);//Se busca un producto en el objeto data.productos
    if (producto) { //Se verifica si se encontró un producto
      carrito.total += producto.precio;//Se aumenta el valor del total del carrito sumando el precio del producto
      carrito.agregarProducto(producto);//Metodo del objeto carrito, pasando el producto encontrado como argumento
      localStorage.setItem('carrito', JSON.stringify(carrito));//Se almacena el estado actual del carrito en el navegador
    }
  }
  
  

  


  