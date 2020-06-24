import IniScores from '../components/IniScores'

export const addPlayer = (Players = {}, payload) => {
    if (Players.newPlayerName.trim() !== '') {
        let pCount = Object.keys(Players.playerList).length;
        pCount++
        let newPlayerKey = 'player' + pCount;
        return {
            ...Players,
            playerList: {
                ...Players.playerList, [newPlayerKey]: {
                    key: newPlayerKey,
                    name: Players.newPlayerName,
                    score: IniScores,
                    turns: 3,
                    total: 0,
                    finish: false
                }
            },
            newPlayerName: '',
        }
    } else {
        return Players;
    }
}

export const startGame = (Players = {}, payload) => {
    if (Object.keys(Players.playerList).length) {
        return {
            ...Players,
            turn: Players.playerList[Object.keys(Players.playerList)[0]].key
        }
    } else {
        return Players
    }
}

export const crossOut = (Players = {}, payload) => {

    // Total del jugador
    let playerTotal = Players.playerList[Players.turn].total;
    // Puntajes del jugador actual
    let playerScore = {};
    let uncrossScore = [];
    for (let key in Players.playerList[Players.turn].score) {
        playerScore[key] = { ...Players.playerList[Players.turn].score[key] }

        if (!playerScore[key].croseed_out) {
            playerScore[key].className = 'tc fw1';
            uncrossScore.push({ ...playerScore[key] })
        }
    }

    // Obtengo siguiente jugador
    let playerKeys = Object.keys(Players.playerList);
    let nextPlayerIndex = playerKeys.indexOf(Players.turn);
    nextPlayerIndex++
    let nextPlayer = nextPlayerIndex >= playerKeys.length ? playerKeys[0] : playerKeys[nextPlayerIndex];

    // Modifico puntaje seleccionado
    playerScore[payload].croseed_out = true;
    playerScore[payload].className = 'tc fw1 strike';
    // Sumo al total
    playerTotal = playerScore[payload].score >= 0 ? playerTotal + playerScore[payload].score : playerTotal;

    //Reinicio puntajes
    for (let k in playerScore) {
        playerScore[k].score = 0
    }

    // Ya tacho todas las opciones?
    let finish = uncrossScore.length === 1 ? true : false;

    //Terminaron todos los jugadores?
    let winner = '';
    if (finish) {
        let pendingPlayers = playerKeys.filter(p => !Players.playerList[p].finish && Players.playerList[p].key !== Players.turn);
        if (!pendingPlayers.length) {
            let values = playerKeys.map(k => {
                return [
                    k, 
                    Players.playerList[k].key === Players.turn ? playerTotal : Players.playerList[k].total 
                ]
            });
            values.sort(function (a, b) { return b[1] - a[1] });
            winner = values[0][0];
        }
    }

    // Devuelvo nuevo estado
    return {
        ...Players,
        playerList: {
            ...Players.playerList,
            [Players.turn]: {
                ...Players.playerList[Players.turn],
                score: playerScore,
                turns: 3,
                total: playerTotal,
                finish: finish
            }
        },
        turn: nextPlayer,
        winner: winner
    }
}
