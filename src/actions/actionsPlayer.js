export const addPlayer = (text) => ({
    type: 'ADD_PLAYER',
    payload: text
})

export const setNewPlayerName = (text) => ({
    type: 'SET_NEW_PLAYER_NAME',
    payload: text
})

export const startGame = (text) => ({
    type: 'START_GAME',
    payload: text
})

export const crossOut = (text) => ({
    type: 'CROSS_OUT',
    payload: text
})