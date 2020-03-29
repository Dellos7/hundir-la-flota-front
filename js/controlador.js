var Controlador = function( vista ){
    this.vista = vista;
    this.estado = EstadoJuego.SIN_JUGAR;
    this.barcoSeleccionado = null;
    this.numBarcosFaltan = NUM_BARCOS;
    this.matrizCeldasPropias = [ [], [], [], [], [], [], [], [], [], [] ];
    this.matrizCeldasRival = [ [], [], [], [], [], [], [], [], [], [] ];
};

Controlador.prototype.comenzarJuego = function(){
    this.estado = EstadoJuego.COLOCANDO_BARCOS;
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
    if( this.estado === EstadoJuego.COLOCANDO_BARCOS ){
        let datosCelda = obtenerDatosCelda( celdaEl.id );
        if( datosCelda ){
            let { letra, numero } = datosCelda;
            let fila = numero-1;
            let columna = LETRAS.indexOf(letra);
            if( this.matrizCeldasPropias[fila][columna] && this.vista.preguntarDeshacerBarco() ){
                this.deshacerBarco( this.matrizCeldasPropias[fila][columna] );
            } else if( !this.barcoSeleccionado || comprobarBarcoColocado(this.barcoSeleccionado) ){
                this.vista.mostrarMensaje( 'Debes seleccionar un barco' );
            }
             else if( comprobarPuedoColocarCeldaBarco( this.matrizCeldasPropias, this.barcoSeleccionado, fila, columna ) ){
                this.matrizCeldasPropias[fila][columna] = this.barcoSeleccionado.barcoEl.id;
                this.barcoSeleccionado.celdasFaltan--;
                this.vista.celdaColocada(celdaEl.id);
                if( this.barcoSeleccionado.celdasFaltan == 0 ){
                    this.vista.barcoColocado(this.barcoSeleccionado.barcoEl, this.matrizCeldasPropias);
                    this.numBarcosFaltan--;
                    if( this.numBarcosFaltan == 0 ){
                        this.finBarcosColocados();
                    }
                }
            } else{
                this.vista.mostrarMensaje( 'No puedes colocar el barco en esa celda' );
            }
        } else{
            this.vista.mostrarMensaje( 'Ha ocurrido un error seleccionando la celda' );
        }
    }
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
    //this.estado = EstadoJuego.COLOCANDO_BARCOS;
    let barcoEl = barcoCeldaEl.parentNode;
    this.barcoSeleccionado = {};
    this.barcoSeleccionado.barcoEl = barcoEl;
    this.barcoSeleccionado.tam = obtenerTamBarco(barcoEl);
    this.barcoSeleccionado.celdasFaltan = this.barcoSeleccionado.tam;
    this.vista.seleccionarBarco(barcoEl.id);
};

Controlador.prototype.finBarcosColocados = function(){
    setTimeout( () => {
        if( this.vista.preguntarFinBarcosColocados() ){
            this.estado = EstadoJuego.BARCOS_COLOCADOS;
            this.vista.deshabilitarTableroPropio();
            this.vista.cambiarMensajeEstadoJuego( EstadoJuegoMensaje.BARCOS_COLOCADOS );
        }
    }, 1000 );
};

Controlador.prototype.deshacerBarco = function( idBarco ){
    let numCeldasBarco = MapaBarcos[idBarco];
    let numCeldas = 0;
    this.vista.deshacerBarco( idBarco, this.matrizCeldasPropias );
    for( let i = 0; i < NUM_FILAS; i++ ){
        for( let j = 0; j < NUM_COLUMNAS; j++ ){
            if( this.matrizCeldasPropias[i][j] == idBarco ){
                numCeldas++;
                delete this.matrizCeldasPropias[i][j];
            }
        }
    }
    if( numCeldasBarco == numCeldas ){
        this.numBarcosFaltan++;
    }
    this.barcoSeleccionado = null;
};

let obtenerTamBarco = (barcoEl) => {
    let tamBarco = 0;
    if( barcoEl ){
        if( barcoEl.classList.contains('barco__4') ){
            tamBarco = 4;
        } else if( barcoEl.classList.contains('barco__3') ){
            tamBarco = 3;
        } else if( barcoEl.classList.contains('barco__2') ){
            tamBarco = 2;
        } else if( barcoEl.classList.contains('barco__1') ){
            tamBarco = 1;
        }
    }
    return tamBarco;
};

let obtenerDatosCelda = (idCeldaStr) => {
    if( idCeldaStr ){
        let idCeldaArr = idCeldaStr.split("_")[1].split("-");
        return { 'letra': idCeldaArr[0], 'numero': idCeldaArr[1] };
    }
    return null;
};

let comprobarBarcoColocado = (barco) => {
    if( barco && barco.celdasFaltan == 0 ){
        return true;
    }
    return false;
};

let comprobarPuedoColocarCeldaBarco = ( matrizCeldasPropias, barco, fila, columna ) => {
    // Comprobamos que no hacemos click en una celda ocupada y que no toque con ningún barco
    let celdaValida = comprobarCeldaValida( matrizCeldasPropias, fila, columna, barco.barcoEl.id, barco.celdasFaltan == barco.tam );
    return celdaValida;
};

let comprobarCeldaValida = ( matriz, fila, columna, idBarco, primeraCelda ) => {
    let sePuede = true;
    let barcoAlineado = primeraCelda ? true : false;
    if( fila < 0 || fila >= NUM_FILAS || columna < 0 || columna >= NUM_COLUMNAS ){
        sePuede = false;
    } else if( matriz[fila][columna] ){
        sePuede = false;
    } else if( fila == 0 ){
        sePuede &= !matriz[fila+1][columna] || matriz[fila+1][columna] == idBarco;
        if( !primeraCelda ){
            barcoAlineado |= matriz[fila+1][columna] == idBarco;
        }
        if( columna != 0 ){
            sePuede &= ( !matriz[fila][columna-1] || matriz[fila][columna-1] == idBarco) && !matriz[fila+1][columna-1];
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila][columna-1] == idBarco;
            }
        }
        if( columna != NUM_COLUMNAS-1 ){
            sePuede &= ( !matriz[fila][columna+1] || matriz[fila][columna+1] == idBarco) && !matriz[fila+1][columna+1];
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila][columna+1] == idBarco;
            }
        }
    } else if( columna == 0 ){
        sePuede &= !matriz[fila][columna+1] || matriz[fila][columna+1] == idBarco;
        if( !primeraCelda ){
            barcoAlineado |= matriz[fila][columna+1] == idBarco;
        }
        if( fila != 0 ){
            sePuede &= !matriz[fila-1][columna+1] && ( !matriz[fila-1][columna] || matriz[fila-1][columna] == idBarco);
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila-1][columna] == idBarco;
            }
        }
        if( fila != NUM_FILAS-1 ){
            sePuede &= !matriz[fila+1][columna+1] && ( !matriz[fila+1][columna] || matriz[fila+1][columna] == idBarco );
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila+1][columna] == idBarco;
            }
        }
    } else if( fila == NUM_FILAS-1 ){
        sePuede &= !matriz[fila-1][columna] || matriz[fila-1][columna] == idBarco;
        if( !primeraCelda ){
            barcoAlineado |= matriz[fila-1][columna] == idBarco;
        }
        if( columna != 0 ){
            sePuede &= !matriz[fila-1][columna-1] && (!matriz[fila][columna-1] || matriz[fila][columna-1] == idBarco);
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila][columna-1] == idBarco;
            }
        }
        if( columna != NUM_COLUMNAS-1 ){
            sePuede &= ( !matriz[fila][columna+1] || matriz[fila][columna+1] == idBarco) && !matriz[fila-1][columna+1];
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila][columna+1] == idBarco;
            }
        }
    } else if( columna == NUM_COLUMNAS-1 ){
        sePuede &= !matriz[fila][columna-1] || matriz[fila][columna-1] == idBarco;
        if( !primeraCelda ){
            barcoAlineado |= matriz[fila][columna-1] == idBarco;
        }
        if( fila != 0 ){
            sePuede &= ( !matriz[fila-1][columna] || matriz[fila-1][columna] == idBarco ) && !matriz[fila-1][columna-1];
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila-1][columna] == idBarco;
            }
        }
        if( fila != NUM_FILAS-1 ){
            sePuede &= ( !matriz[fila+1][columna] || matriz[fila+1][columna] == idBarco) && !matriz[fila+1][columna-1];
            if( !primeraCelda ){
                barcoAlineado |= matriz[fila+1][columna] == idBarco;
            }
        }
    } else{
        sePuede &=
            ( !matriz[fila-1][columna] || matriz[fila-1][columna] == idBarco ) &&
            !matriz[fila-1][columna+1] &&
            ( !matriz[fila][columna+1] || matriz[fila][columna+1] == idBarco ) &&
            !matriz[fila+1][columna+1] &&
            ( !matriz[fila+1][columna] || matriz[fila+1][columna] == idBarco ) &&
            !matriz[fila+1][columna-1] &&
            ( !matriz[fila][columna-1] || matriz[fila][columna-1] == idBarco ) &&
            !matriz[fila-1][columna-1];
            if( !primeraCelda ){
                barcoAlineado |=
                    matriz[fila-1][columna] == idBarco || matriz[fila][columna+1] == idBarco ||
                    matriz[fila+1][columna] == idBarco || matriz[fila][columna-1] == idBarco;
            }
    }
    return sePuede && barcoAlineado;
};