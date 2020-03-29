const NUM_BARCOS = 10;
const NUM_FILAS = 10;
const NUM_COLUMNAS = 10;

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const TipoSelectorTablero = {
    PROPIO: 'propio',
    RIVAL: 'rival'
};

const EstadoJuego = {
    SIN_JUGAR: 'sin_jugar',
    COLOCANDO_BARCOS: 'colocando_barcos',
    BARCOS_COLOCADOS: 'barcos_colocados',
    JUGANDO_TURNO: 'jugando_turno',
    JUGANDO_NO_TURNO: 'jugando_no_turno'
};

const EstadoJuegoMensaje = {
    SIN_JUGAR: 'Lorem ipsum dolor sit amet',
    COLOCANDO_BARCOS: '¡Coloca tus barcos!',
    BARCOS_COLOCADOS: 'Has colocado tus barcos. Esperando al otro jugador...',
    JUGANDO_TURNO: '¡Tu turno!',
    JUGANDO_NO_TURNO: 'Turno del rival...'
};

const TipoPintadoCelda = {
    AGUA: 'agua',
    BARCO_COLOCADO: 'barco_colocado',
    TOCADO: 'tocado',
    VACIA: 'vacia'
};

const MapaBarcos = {
    "barco-1": 4,
    "barco-2": 3,
    "barco-3": 3,
    "barco-4": 2,
    "barco-5": 2,
    "barco-6": 2,
    "barco-7": 1,
    "barco-8": 1,
    "barco-9": 1,
    "barco-10": 1,
};