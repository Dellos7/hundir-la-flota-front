const DATOS_FORM = 'formPartida';
var Storage = function(){};

Storage.prototype.guardarDatosForm = function( nombreJugador, idPartida ){
    var json = {};
    if( nombreJugador ){
        json.nombreJugador = nombreJugador;
    }
    if( idPartida ){
        json.idPartida = idPartida;
    }
    localStorage.setItem( DATOS_FORM, JSON.stringify(json) );
};

Storage.prototype.obtenerDatosForm = function(){
    var jsonStr = localStorage.getItem(DATOS_FORM);
    if( jsonStr ){
        return JSON.parse(jsonStr);
    }
    return null;
};