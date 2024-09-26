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
