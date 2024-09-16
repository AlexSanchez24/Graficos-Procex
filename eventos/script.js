let audio = document.getElementById('audio');
let Canciones = document.getElementById('ListaCanciones');

Canciones.addEventListener('change', cambiarCancion);

function cambiarCancion(){
    let CancionElegida = Canciones.value;
    audio.src = CancionElegida;
    audio.play();    
    // Crea un nuevo evento personalizado llamado 'CancionSeleccionada'
    // Dispara el evento desde el elemento de audio 
    audio.dispatchEvent(evento);  
}

audio.addEventListener('CancionSeleccionada', mostrarCancion);

function mostrarCancion(){ 
    console.log('Canción Actual: ' + Canciones.value);
}

// Obtener referencias a los elementos del DOM
let botonTema = document.getElementById('botonTema');
let contenido = document.getElementById('contenido');

// Variable para llevar el seguimiento del estado del tema
let temaActual = 'claro'; // El tema inicial es claro

// Añadir un oyente de eventos al botón
botonTema.addEventListener('click', function() {
    // Cambiar el estado del tema
    if (temaActual === 'claro') {
        temaActual = 'oscuro';
    } else {                                                            
        temaActual = 'claro';
    }

    // Crear y disparar un evento personalizado llamado 'temaCambiado'
    let evento = new CustomEvent('temaCambiado', {
        detail: { tema: temaActual }
    });
    document.dispatchEvent(evento);
});

// Escuchar el evento personalizado 'temaCambiado'
document.addEventListener('temaCambiado', function(event) {
    // Cambiar el estilo del contenido basado en el tema seleccionado 
    if (event.detail.tema === 'oscuro') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'rgb(175, 175, 185)';
        botonTema.textContent = 'Cambiar a Tema Claro';
    } else {
        document.body.style.background = 'rgb(175, 175, 185)'; 
        document.body.style.color = 'black';
        botonTema.textContent = 'Cambiar a Tema Oscuro';
    }
});

