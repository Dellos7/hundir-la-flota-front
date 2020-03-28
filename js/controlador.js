var Controlador = function( vista ){
    this.vista = vista;
    this.estado = EstadoJuego.SIN_JUGAR;
};

Controlador.prototype.comenzarJuego = function(){
    console.log('comienza el juego');
    this.vista.comenzarJuego();
    return false;
};

Controlador.prototype.seleccionarMiTablero = function(){
    this.vista.toggleSelectorTableroSeleccionado( TipoSelectorTablero.PROPIO );
    this.vista.mostrarTableroPropio();
};

Controlador.prototype.seleccionarTableroRival = function(){
    this.vista.toggleSelectorTableroSeleccionado( TipoSelectorTablero.RIVAL );
    this.vista.mostrarTableroRival();
};

Controlador.prototype.clickCeldaPropia = function(element){
    let idCeldaStr = element.id;
    console.log(idCeldaStr);
};

Controlador.prototype.anyadirEventoClickCeldas = function(){
    let tdPropiosEls = document.querySelectorAll('#tablero-propio td');
    for( tdEl of tdPropiosEls ){
        tdEl.addEventListener('click', (event) => {
            this.clickCeldaPropia(event.target);
        });
    }
    let tdRivalEls = document.querySelectorAll('#tablero-rival td');
    for( tdEl of tdRivalEls ){
        tdEl.addEventListener('click', (event) => {
            this.clickCeldaRival(event.target);
        });
    }
};

Controlador.prototype.clickCeldaPropia = function(celdaEl){
    console.log('celda propia', celdaEl);
};

Controlador.prototype.clickCeldaRival = function(celdaEl){
    console.log('celda rival', celdaEl);
};

Controlador.prototype.anyadirEventoClickBarcos = function(){
    let barcosEls = document.querySelectorAll('.barco');
    for( let barcoEl of barcosEls ){
        barcoEl.addEventListener('click', (event) => {
            this.seleccionarBarco(event.target);
        });
    }
};

Controlador.prototype.seleccionarBarco = function(barcoCeldaEl){
    let barcoEl = barcoCeldaEl.parentNode;
    console.log(barcoEl);
};

let obtenerDatosCelda = (idCeldaStr) => {
    if( idCeldaStr ){
        let idCeldaArr = idCeldaStr.split("_")[1].split("-");
        return { 'letra': idCeldaArr[0], 'numero': idCeldaArr[1] };
    }
};