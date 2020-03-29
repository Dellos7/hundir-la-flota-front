var Vista = function(){

};

Vista.prototype.comenzarJuego = function(){
    this.ocultarElementosPantallaPrincipal();
    this.ocultarFormularioComenzarJuego();
    this.cambiarMensajeEstadoJuego( EstadoJuegoMensaje.COLOCANDO_BARCOS );
};

Vista.prototype.ocultarElementosPantallaPrincipal = function(){
    let headerEl = document.querySelector('header');
    if( headerEl ){
        headerEl.classList.toggle('invisible');
    }
    let juegoEl = document.getElementById('juego');
    if( juegoEl ){
        juegoEl.classList.toggle('invisible');
    }
};

Vista.prototype.ocultarFormularioComenzarJuego = function(){
    let formEl = document.getElementById('form-comenzar-juego');
    if( formEl ){
        formEl.classList.toggle('invisible');
    }
};

Vista.prototype.cambiarMensajeEstadoJuego = function( mensajeEstadoJuego ){
    let estadoJuegoEl = document.querySelector('.estado-juego');
    if( estadoJuegoEl ){
        estadoJuegoEl.innerHTML = mensajeEstadoJuego;
    }
};

Vista.prototype.toggleSelectorTableroSeleccionado = function( tipoSelectorTablero ){
    let selectorTableroPropio = document.querySelector('.selector-tablero-selector__propio');
    let selectorTableroRival = document.querySelector('.selector-tablero-selector__rival');
    if( selectorTableroPropio && selectorTableroRival ){
        if( tipoSelectorTablero === TipoSelectorTablero.PROPIO ){
            if( !selectorTableroPropio.classList.contains('selector-tablero-selector__seleccionado') ){
                selectorTableroPropio.classList.toggle('selector-tablero-selector__seleccionado');
                selectorTableroRival.classList.toggle('selector-tablero-selector__seleccionado');
            }
        } else{
            if( !selectorTableroRival.classList.contains('selector-tablero-selector__seleccionado') ){
                selectorTableroRival.classList.toggle('selector-tablero-selector__seleccionado');
                selectorTableroPropio.classList.toggle('selector-tablero-selector__seleccionado');
            }
        }
    }
};

Vista.prototype.mostrarTableroPropio = function(){
    let tableroPropioEl = document.getElementById('tablero-propio');
    if( tableroPropioEl ){
        tableroPropioEl.classList.remove('invisible');
    }
    let tableroRivalEl = document.getElementById('tablero-rival');
    if( tableroRivalEl ){
        tableroRivalEl.classList.add('invisible');
    }
    let barcosEl = document.getElementById('barcos');
    if( barcosEl ){
        barcosEl.classList.remove('invisible');
    }
};

Vista.prototype.mostrarTableroRival = function(){
    let tableroRivalEl = document.getElementById('tablero-rival');
    if( tableroRivalEl ){
        tableroRivalEl.classList.remove('invisible');
    }
    let tableroPropioEl = document.getElementById('tablero-propio');
    if( tableroPropioEl ){
        tableroPropioEl.classList.add('invisible');
    }
    let barcosEl = document.getElementById('barcos');
    if( barcosEl ){
        barcosEl.classList.add('invisible');
    }
};

Vista.prototype.mostrarMensaje = function(mensaje){
    alert(mensaje);
};

Vista.prototype.celdaColocada = function( idCelda ){
    let celdaEl = document.getElementById(idCelda);
    if( celdaEl ){
        celdaEl.classList.add('colocada');
    }
};

Vista.prototype.barcoColocado = function(barcoEl, matrizCeldas){
    if( barcoEl ){
        barcoEl.classList.add('barco-colocado');
        barcoEl.classList.remove('barco-seleccionado');
    }
    for( let i = 0; i < NUM_FILAS; i++ ){
        for( let j = 0; j < NUM_COLUMNAS; j++ ){
            if( matrizCeldas[i][j] == barcoEl.id ){
                const idCelda = obtenerIdCelda(i, j);
                this.pintarCeldaMatriz( TipoPintadoCelda.BARCO_COLOCADO, idCelda );
            }
        }
    }
};

Vista.prototype.pintarCeldaMatriz = function( tipoPintado, idCelda ){
    let celdaEl = document.querySelector('#' + idCelda);
    if( celdaEl ){
        switch(  tipoPintado ){
            case TipoPintadoCelda.BARCO_COLOCADO:
                celdaEl.classList.add('colocada-completo');
                break;
            case TipoPintadoCelda.VACIA:
                //TODO: añadir las que faltan
                celdaEl.classList.remove('colocada', 'colocada-completo');
                break;
        }
    }
};

Vista.prototype.preguntarFinBarcosColocados = function(){
    return confirm( "¿Es así como quieres dejar los barcos?" );
};

Vista.prototype.preguntarDeshacerBarco = function(){
    return confirm( "¿Quieres deshacer el barco?" );
};

Vista.prototype.deshacerBarco = function( idBarco, matrizCeldas ){
    let barcoEl = document.querySelector('#' + idBarco);
    if( barcoEl ){
        barcoEl.classList.remove('barco-colocado', 'barco-seleccionado');
    }
    for( let i = 0; i  < NUM_FILAS; i++ ){
        for( let j = 0; j < NUM_COLUMNAS; j++ ){
            if( matrizCeldas[i][j] == idBarco ){
                const idCelda = obtenerIdCelda(i, j);
                this.pintarCeldaMatriz( TipoPintadoCelda.VACIA, idCelda );
            }
        }
    }
};

Vista.prototype.seleccionarBarco = function(idBarco){
    let barcoEl = document.querySelector('#' + idBarco);
    if( barcoEl ){
        barcoEl.classList.add('barco-seleccionado');
    }
};

Vista.prototype.deshabilitarTableroPropio = function(){
    let tableroPropioEl = document.querySelector('#tablero-propio');
    if( tableroPropioEl ){
        tableroPropioEl.classList.add('deshabilitado');
    }
};

let obtenerIdCelda = ( fila, columna ) => {
    return `celda_${LETRAS[columna]}-${fila+1}`;
};