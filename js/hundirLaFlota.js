
var vista = new Vista();
var storage = new Storage();
var controlador = new Controlador( vista, storage );

window.onload = () => {
    controlador.anyadirEventoClickCeldas();
    controlador.anyadirEventoClickBarcos();
    let datosForm = storage.obtenerDatosForm();
    if( datosForm ){
        vista.rellenarDatosFormulario( datosForm.nombreJugador, datosForm.idPartida );
    }
};