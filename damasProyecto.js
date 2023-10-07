    const tablero = [];

    //funcion que coloca las fichas en las posiciones iniciales
    function inicializarTablero() {
        for (let i = 0; i < 8; i++) { // fila
            let fila = [];
            for (let j = 0; j < 8; j++) { // columna
                if ((i + j) % 2 === 0) { // en estas posiciones hay piezas
                    if (i < 3) { // en las filas 0,1 y 2 hay fichas blancas
                        fila.push('X');
                    } else if (i > 4) { // en las filas 5,6 y 7 hay fichas negras
                        fila.push('O');
                    } else {
                        // se insertan los espacios vacíos
                        fila.push(' ');
                    }
                } else {
                    fila.push(' '); // en las posiciones con i+j impares se insertan espacios vacios
                }
            }
            tablero.push(fila); // se mete la fila en el tablero
        }
    }

    // funcion para imprimir el tablero
    function mostrarTablero() {
        // las letras para decorar el tablero
        console.log('|   | A | B | C | D | E | F | G | H |');
        for (let i = 0; i < 8; i++) {
            // el numero de la fila para decorar el tablero y luego se imprime por fila
            let row = '| ' + (i + 1) + ' | ' + tablero[i].join(' | ') + ' |';
            console.log(row);
            console.log('--------------------------------------');
        }
        console.log('| A | B | C | D | E | F | G | H |');
    }

    // se verifica que la ficha que el jugador esta seleccionando, le corresponde
    // si el usuario juega, la ficha en la posicion de origen debe ser X
    function validarOrigen(fila_origen, columna_origen, jugador) {
        return tablero[fila_origen][columna_origen] === jugador;
    }

    // una vez validado el movimiento, se mueve la ficha
    function moverPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador) {
        tablero[fila_destino][columna_destino] = jugador; // se coloca la ficha en la posicion de destino
        tablero[fila_origen][columna_origen] = ' '; // se vacia la posicion de origen
    }

    // se verifica que el movimiento es valido segun las reglas del juego (movimiento en diagonal)

    function validarDestino(fila_origen, columna_origen, fila_destino, columna_destino, oponente, jugador) {
        // Verificar si el movimiento está dentro del tablero
        if (fila_destino < 0 || fila_destino > 7 || columna_destino < 0 || columna_destino > 7) {
            return -1; // Movimiento fuera del tablero
        }
    
        // Verificar si la casilla de destino no está ocupada
        if (tablero[fila_destino][columna_destino] !== ' ') {
            return -1; // La casilla de destino no está vacía
        }
    
        const DiffFila = fila_destino - fila_origen;
        const DiffColumna = columna_destino - columna_origen;
    
        if ((DiffFila === 1 || DiffFila === -1) && (DiffColumna === 1 || DiffColumna === -1)) {
            // Movimiento válido de una casilla en diagonal
            if ((jugador === 'X' && fila_destino > fila_origen) || (jugador === 'O' && fila_destino < fila_origen)) {
                return 0;
            }
        }
    
        if ((DiffFila === 2 || DiffFila === -2) && (DiffColumna === 2 || DiffColumna === -2)) {
            // Movimiento con salto sobre el oponente
            const filaOp = (fila_destino + fila_origen) / 2;
            const columnaOp = (columna_destino + columna_origen) / 2;

    
            if (tablero[filaOp][columnaOp] === oponente) {
                if ((jugador === 'X' && fila_destino > fila_origen)) {
                    tablero[filaOp][columnaOp] = ' ';
                    return 1; // Movimiento válido con salto sobre el oponente
                }
                else if ((jugador === 'O' && fila_destino < fila_origen)) {
                    tablero[filaOp][columnaOp]= ' ';
                    return 1; // Movimiento válido con salto sobre el oponente
                }
            }
        }
    
        return -1; // Movimiento no válido
    }   

    function jugarPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador) {
        let oponente;
        if (jugador === 'X') {
            oponente = 'O';
        } else if (jugador === 'O') {
            oponente = 'X';
        }
        const isValidOrigen = validarOrigen(fila_origen, columna_origen, jugador);

        if (isValidOrigen) {
            const isValidDestino = validarDestino(fila_origen, columna_origen, fila_destino, columna_destino, oponente, jugador);
            if (isValidDestino >= 0) {
                moverPieza(fila_origen, columna_origen, fila_destino, columna_destino, jugador);
                return isValidDestino;
            }
        }
        return -1;
    }

    function juegaUsuario(fichaUsuario) {
        let isValid = -1;
        while (isValid == -1) {
            const fila_origen = parseInt(prompt('Ingresa la fila de origen')) - 1;
            const columna_origen = parseInt(prompt('Ingresa la columna de origen')) - 1;
            const fila_destino = parseInt(prompt('Ingresa la fila destino')) - 1;
            const columna_destino = parseInt(prompt('Ingresa la columna destino')) - 1;
            isValid = jugarPieza(fila_origen, columna_origen, fila_destino, columna_destino, fichaUsuario);
            
            if (isValid == -1) {
                alert('Movimiento no válido');
            }
            
            console.log("El Usuario que quiere jugar es "+ fichaUsuario)
        }

        return isValid;
    }

    function puedeJugar(jugador) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (jugador == 'X') {
                    if (tablero[i][j] == jugador) {
                        if (i + 1 < 8 && j + 1 < 8 && tablero[i + 1][j + 1] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                        if (i + 1 < 8 && j - 1 >= 0 && tablero[i + 1][j - 1] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                        if (i + 2 < 8 && j + 2 < 8 && tablero[i + 1][j + 1] == 'O' && tablero[i + 2][j + 2] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                        if (i + 2 < 8 && j + 2 < 8 && tablero[i + 1][j - 1] == 'O' && tablero[i + 2][j - 2] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                    }
                }
                else if (jugador == 'O') {
                    if (tablero[i][j] == jugador) {
                        if (i - 1 >= 0 && j + 1 < 8 && tablero[i - 1][j + 1] == ' ') {
                            //contJugadas += 1;
                            return true
                        }
                        if (i - 1 >= 0 && j - 1 >= 0 && tablero[i - 1][j - 1] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                        if (i - 1 >= 0 && j + 2 < 8 && tablero[i - 1][j + 1] == 'O' && tablero[i - 2][j + 2] == ' ') {
                            //contJugadas += 1;
                            return true
                        }
                        if (i - 1 >= 0 && j + 2 < 8 && tablero[i - 1][j - 1] == 'O' && tablero[i - 2][j - 2] == ' ') {
                            //contJugadas += 1;
                            return true;
                        }
                    }
                }
            }
        }
        //return contJugadas;
        return false;
    }

    function jugarDamas() {
        inicializarTablero();
        let terminoJuego = false;
        let contUsuario = 0;
        var contO=0, contX=0;
        let fichaUsuario, oponente, preguntar = true, opcion;
        let ganador = 0 // 1 gana usuario y si es 2 gana compu
        while (preguntar) {
            opcion = parseInt(prompt("Que ficha quieres ser? \n1)Blanca\n2)Negra"));
            if (opcion == 1 || opcion == 2) {
                preguntar = false
            }
        }

        if (opcion == 1) {
            fichaUsuario = 'X';
            oponente = 'O';
        } else {
            fichaUsuario = 'O';
            oponente = 'X';
        }

        while (terminoJuego == false) {
            mostrarTablero();
        let existeJugadas;
            existeJugadas = puedeJugar(fichaUsuario);
            if (!existeJugadas) {
                terminoJuego = true;
                ganador = oponente;
                break;
            }
            console.log("Juega el que maneja la ficha: "+ fichaUsuario)
            contUsuario += juegaUsuario(fichaUsuario);
            mostrarTablero();

            if (fichaUsuario == 'X') {
                if(contUsuario==1){
                contX++;
            }
                fichaUsuario = 'O';
                oponente = 'X';

            } else {
                if(contUsuario==1){
                    contO++;
                }
                fichaUsuario = 'X';
                oponente = 'O';
            }
        }
        if (ganador == "X") {
            contX;
            console.log("El ganador es: "+ganador+", quien tiene las damas de color blanco con " +contX+" piezas comidas del rival");
        }else if(ganador=="O"){
            contO;
            console.log("El ganador es: "+ganador+", quien tiene las damas de color negro con " +contO+" piezas comidas del rival");
        }
    }
    jugarDamas();
