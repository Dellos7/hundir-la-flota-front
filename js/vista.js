var Vista = function(){

};

Vista.prototype.comenzarJuego = function(){
    this.ocultarElementosPantallaPrincipal();
    this.ocultarFormularioComenzarJuego();
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