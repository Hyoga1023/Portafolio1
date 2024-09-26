function volverAlInicio() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onscroll = function() {
    const btnVolver = document.querySelector('.btn-volver');
    if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
        btnVolver.classList.add('show'); // Muestra el botón
    } else {
        btnVolver.classList.remove('show'); // Oculta el botón
    }
};
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    alert('Formulario enviado con éxito!');
    
    this.reset();
    
    // Alternativa: si quieres limpiar los campos individualmente:
    // document.getElementById('nombre').value = '';
    // document.getElementById('email').value = '';
    // document.getElementById('asunto').value = '';
    // document.getElementById('mensaje').value = '';
});