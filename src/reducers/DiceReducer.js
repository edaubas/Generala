// import { iniState } from '../store';

// Contar cuantos dados salieron pra cada numero
const checkCount = (count, num) => {
    for (let i in count) {
        if (count[i] === num) {
            return true;
        }
    }
}

//Valido siguiente nro en escalera
const validNext = (array) => {
    for (let i = 0; i < 4; i++) {
        let next = array[i] + 1;
        next = next === 7 ? 1 : next;
        if (next !== array[i + 1]) {
            return false;
        }
    }
    return true;
}

const setScore = (obj, count) => {
    // Actualizo posibles valores para el jugador
    if (count) {

        if (!obj.croseed_out) {
            obj.className = 'tc fw9 grow grow:hover pointer';
        }

    } else {

        if (!obj.croseed_out) {
            obj.className = 'tc fw1';
        }
    }

    obj.score = count;
}

export const selectAll = (state, payload) => {
    let newState = {}
    for (let dice in state) {
        newState[dice] = {
            ...state[dice], selected: true,
            style: {
                ...state[dice].style,
                background: 'yellow'
            }
        }
    }
    return newState;
}

export const selectDice = (state, payload) => {
    let newState = {}
    newState = {
        ...state,
        [payload.key]: {
            ...state[payload.key],
            selected: state[payload.key].selected === true ? false : true,
            style: {
                ...state[payload.key].style,
                background: ''
            }
        }
    }
    newState[payload.key].style.background = newState[payload.key].selected === true ? 'yellow' : '';
    return newState;
}

export const rollDice = (state, payload) => {

    // Puntajes del jugador actual
    let playerScore = {};
    let uncrossScore = [];
    for (let key in state.Players.playerList[payload].score) {
        playerScore[key] = { ...state.Players.playerList[payload].score[key] }
        // if (!playerScore[key].croseed_out && playerScore[key].key[0] !== "n") {
        if (!playerScore[key].croseed_out) {            
            uncrossScore.push({ ...playerScore[key] })
        }
    }

    // Turnos del jugador actual
    let turns = Number(state.Players.playerList[payload].turns)

    // Genero objecto con dados con nuevos valores
    let newDices = {}
    for (let dice in state.Dices) {
        newDices[dice] = {
            ...state.Dices[dice],
            value: state.Dices[dice].selected === true ? Math.ceil(Math.random() * 6) : state.Dices[dice].value,
            selected: false,
            style: {
                ...state.Dices[dice].style,
                background: ''
            }
        }
    }

    // Obtengo array con nros de los dados
    let values = (Object.keys(newDices).map(k => { return newDices[k].value }));

    //  Genero objeto con la suma de la cantidad de veces
    //  que figura cada numero
    let count = {}, i = 1;
    while (i <= 6) {
        let id = "n" + i;
        count[i] = values.filter(a => a == i).length;
        if (!playerScore[id].croseed_out) {
            setScore(playerScore[id], count[i] * i);
        }
        i++;
    }

    if (checkCount(count, 5)) {
        if (turns === 3) {
            setScore(playerScore["gene_serv"], 50);
        } else {
            setScore(playerScore["gene"], 50);
        }
    } else {
        setScore(playerScore["gene_serv"], 0);
        setScore(playerScore["gene"], 0);
    };

    if (checkCount(count, 4)) {
        setScore(playerScore["poker"], 40);
    } else {
        setScore(playerScore["poker"], 0);
    };
    if (checkCount(count, 3) && checkCount(count, 2)) {
        setScore(playerScore["full"], 30);
    } else {
        setScore(playerScore["full"], 0);
    };

    // Valido escalera
    let sortValues = values.map(d => d);
    sortValues.sort(function (a, b) { return a - b });
    if (sortValues[0] === 1 || sortValues[0] === 2 || sortValues[0] === 3) {
        if (validNext(sortValues)) {
            setScore(playerScore["esca"], 20);
        } else {
            setScore(playerScore["esca"], 0);
        };
    }

    // Resto 1 al turno, si es 0 reviso que opciones tienen
    // que habilitar para elegir
    console.log(uncrossScore)
    turns--

    if (!turns && uncrossScore.length) {
        playerScore[uncrossScore[0].key].className = 'tc fw9 grow grow:hover pointer';
        playerScore[uncrossScore[0].key].score = -1;
    }

    // Devuelvo nuevo estado
    return {
        ...state,
        Dices: newDices,
        Players: {
            ...state.Players,
            playerList: {
                ...state.Players.playerList,
                [payload]: {
                    ...state.Players.playerList[payload],
                    score: playerScore,
                    turns: turns
                }
            }
        }
    }
}
