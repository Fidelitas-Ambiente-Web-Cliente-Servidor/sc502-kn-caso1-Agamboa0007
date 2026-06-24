const menu = [
  { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada' },
  { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada' },
  { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte' },
  { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte' },
  { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte' },
  { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre' },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre' }
];

let reservas = [];

function renderMenu(datos = menu) {

    const contenedor = document.getElementById("contenedorMenu");

    contenedor.innerHTML = "";

    datos.forEach(plato => {

        const card = document.createElement("div");
        card.classList.add("card-plato");

        card.innerHTML = `
            <h3>${plato.nombre}</h3>
            <p>${plato.descripcion}</p>
            <p><strong>₡${plato.precio.toLocaleString()}</strong></p>
            <p>${plato.categoria}</p>
        `;

        contenedor.appendChild(card);

    });
}

function filtrarCategoria(categoria) {

    if (categoria === "Todos") {
        renderMenu(menu);
        return;
    }

    const filtrado = menu.filter(
        plato => plato.categoria === categoria
    );

    renderMenu(filtrado);
}

function validarFormulario() {

    let valido = true;

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const personas = document.getElementById("personas").value;

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorPersonas").textContent = "";

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    if(nombre.length < 5 || !regexNombre.test(nombre)){
        document.getElementById("errorNombre").textContent =
        "Ingrese un nombre válido.";
        valido = false;
    }

    const regexCorreo =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regexCorreo.test(correo)){
        document.getElementById("errorCorreo").textContent =
        "Correo inválido.";
        valido = false;
    }

    const hoy = new Date().toISOString().split("T")[0];

    if(fecha < hoy){
        document.getElementById("errorFecha").textContent =
        "Fecha inválida.";
        valido = false;
    }

    if(personas < 1 || personas > 20){
        document.getElementById("errorPersonas").textContent =
        "Debe ser entre 1 y 20.";
        valido = false;
    }

    document.getElementById("btnEnviar").disabled = !valido;

    return valido;
}

function agregarReserva() {

    if(!validarFormulario()) return;

    const reserva = {

        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        personas: parseInt(document.getElementById("personas").value)

    };

    reservas.push(reserva);

    const fila = document.createElement("tr");

    fila.classList.add("fila-reserva");

    if(reserva.personas >= 6){
        fila.style.backgroundColor = "#ffe6b3";
    }

    fila.innerHTML = `
        <td>${reserva.nombre}</td>
        <td>${reserva.correo}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.hora}</td>
        <td>${reserva.personas}</td>
    `;

    document.getElementById("tablaReservas")
    .appendChild(fila);

    document.getElementById("formReserva").reset();

    document.getElementById("btnEnviar").disabled = true;

    actualizarResumen();
}

function actualizarResumen() {

    const totalReservas = reservas.length;

    const totalPersonas = reservas.reduce(
        (total, r) => total + r.personas, 0
    );

    let mayor = 0;

    reservas.forEach(r => {
        if(r.personas > mayor){
            mayor = r.personas;
        }
    });

    document.getElementById("resumen").innerHTML = `
        <h3>Resumen</h3>
        <p>Total reservas: ${totalReservas}</p>
        <p>Total personas: ${totalPersonas}</p>
        <p>Mayor reserva: ${mayor} personas</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {

    renderMenu();

    document.querySelectorAll("input, select").forEach(campo => {
        campo.addEventListener("input", validarFormulario);
    });

    document.getElementById("formReserva")
    .addEventListener("submit", function(e){

        e.preventDefault();

        agregarReserva();

    });

});