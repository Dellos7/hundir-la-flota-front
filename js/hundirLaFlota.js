
var vista = new Vista();
var controlador = new Controlador( vista );

window.onload = () => {
    controlador.anyadirEventoClickCeldas();
    controlador.anyadirEventoClickBarcos();
};