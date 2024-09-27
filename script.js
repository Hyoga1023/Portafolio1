// Función para volver al inicio
function volverAlInicio() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mostrar botón de volver al inicio según scroll
window.onscroll = function() {
    const btnVolver = document.querySelector('.btn-volver');
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        btnVolver.classList.add('show'); // Muestra el botón
    } else {
        btnVolver.classList.remove('show'); // Oculta el botón
    }
};

// Validaciones del formulario
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Capturar los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error').forEach(function(el) {
        el.textContent = '';
    });

    let errores = false;

    // Validar campo "Nombre"
    if (nombre === '') {
        mostrarError('nombreError', 'El campo Nombre no puede estar vacío.');
        errores = true;
    } else if (nombre.length > 50) {
        mostrarError('nombreError', 'El campo Nombre no puede superar los 50 caracteres.');
        errores = true;
    }

    // Validar campo "Asunto"
    if (asunto === '') {
        mostrarError('asuntoError', 'El campo Asunto no puede estar vacío.');
        errores = true;
    } else if (asunto.length > 50) {
        mostrarError('asuntoError', 'El campo Asunto no puede superar los 50 caracteres.');
        errores = true;
    }

    // Validar campo "Mensaje"
    if (mensaje === '') {
        mostrarError('mensajeError', 'El campo Mensaje no puede estar vacío.');
        errores = true;
    } else if (mensaje.length > 300) {
        mostrarError('mensajeError', 'El campo Mensaje no puede superar los 300 caracteres.');
        errores = true;
    }

    // Si no hay errores, mostrar alerta y resetear el formulario
    if (!errores) {
        alert('Formulario enviado con éxito!');
        this.reset();
    }
});

// Función para mostrar errores
function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
}
