let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarcarrito();

function agregarcarrito(nombre, precio, imagen){
    let productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente){
        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
    }

    actualizarcarrito();

    let icono = document.querySelector(".carrito-icono");
    icono.style.transform="scale(1.3)";
    setTimeout(()=>{
        icono.style.transform="scale(1)";
    },200);
}

function actualizarcarrito(){
    let lista = document.getElementById("lista-carrito");
    let contador = document.getElementById("contador-carrito");
    let total = document.getElementById("total");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach((producto,index)=>{
        let li = document.createElement("li");

        li.innerHTML = `
        <img src="${producto.imagen}" width="40">
        ${producto.nombre} - $${producto.precio}
        <div class="cantidad">
        <button onclick="cambiarcantidad(${index},-1)">-</button>
        ${producto.cantidad}
        <button onclick="cambiarcantidad(${index},1)">+</button>
        <button onclick="eliminarproducto(${index})">x</button>
        </div>
        `;

        lista.appendChild(li);

        suma += producto.precio * producto.cantidad;
    });

    contador.innerText = carrito.length;
    total.innerText = suma;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarproducto(index){
    carrito.splice(index,1);
    actualizarcarrito();
}

function vaciarcarrito(){
    carrito = [];
    actualizarcarrito();
}

function togglecarrito(){
    let panel = document.getElementById("carrito-panel");

    if (panel.style.right === "0px"){
        panel.style.right = "-300px";
    } else{
        panel.style.right = "0px";
    }
}

function cambiarcantidad(index,cambio){
    carrito[index].cantidad += cambio;

    if(carrito[index].cantidad <= 0){
        carrito.splice(index,1);
    }

    actualizarcarrito();
}

function buscarproducto(){
    let input = document.getElementById("buscar").value.toLowerCase();
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto=>{
        let texto = producto.innerText.toLowerCase();

        if (texto.includes(input)){
            producto.style.display="block";
        } else{
            producto.style.display="none";
        }
    });
}

function filtrar(categoria){
    let productos = document.querySelectorAll(".producto");

    productos.forEach(producto=>{

        if (categoria === "todos" || producto.dataset.categoria === categoria){
            producto.style.display="block";
        } else{
            producto.style.display="none";
        }

    });
}

function abrirPago(){
    document.getElementById("modalpago").style.display="flex";
}

function cerrarpago(){
    document.getElementById("modalpago").style.display="none";
}

function procesarPago(metodo){

    if(carrito.length === 0){
        alert("Tu carrito está vacío");
        return;
    }

    alert("Pago realizado con " + metodo + " correctamente");

    carrito = [];
    actualizarcarrito();
    cerrarpago();
}

function registrar(){
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("usuario",usuario);
    localStorage.setItem("password",password);

    alert("Usuario registrado");
}

function login(){

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    let usuarioguardado = localStorage.getItem("usuario");
    let passguardado = localStorage.getItem("password");

    if(usuario === usuarioguardado && password === passguardado){

        alert("Bienvenido " + usuario);
        document.getElementById("login").style.display="none";

    } else{
        alert("Usuario o contraseña incorrecta");
    }

}

window.onload = function (){

    let usuarioguardado = localStorage.getItem("usuario");

    if (usuarioguardado){
        document.getElementById("login").style.display="none";
    }

}

function agregarProducto(){

    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;

    let contenedor = document.querySelector(".contenedor-productos");

    let nuevo = document.createElement("div");

    nuevo.classList.add("producto");

    nuevo.innerHTML = `
        <h3>${nombre}</h3>
        <p>$${precio} MXN</p>
        <button onclick="agregarcarrito('${nombre}', ${precio}, '')">
        Agregar al carrito
        </button>
    `;

    contenedor.appendChild(nuevo);

}