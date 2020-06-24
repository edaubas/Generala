// import{ CHANGE_SEARCH_FIELD } from './constants';

export const selectDice = (text) => ({
    type: 'SELECT_DICE',
    payload: text
})

export const rollDice = ( array ) => ({
    type: 'ROLL_DICE',
    payload: array
})

export const seleAll = (text) => ({
    type: 'SELECT_ALL',
    payload: text
})
