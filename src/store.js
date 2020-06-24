import { createStore, combineReducers, applyMiddleware } from 'redux';
import { addPlayer, startGame, crossOut } from './reducers/PlayerReducer';
import { selectAll, selectDice, rollDice } from './reducers/DiceReducer';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = {
    Players: {
        playerList: {},
        turn: '',
        newPlayerName: '',
        winner: '',
    },
    Dices: {
        d1: { key: 'd1', value: 0, selected: false, style: { background: '' } },
        d2: { key: 'd2', value: 0, selected: false, style: { background: '' } },
        d3: { key: 'd3', value: 0, selected: false, style: { background: '' } },
        d4: { key: 'd4', value: 0, selected: false, style: { background: '' } },
        d5: { key: 'd5', value: 0, selected: false, style: { background: '' } }

    }
}

const rootReducer = (state = store, { type, payload }) => {

    switch (type) {
        case 'SELECT_ALL':
            return {
                Dices: selectAll(state.Dices, payload),
                Players: state.Players,
            };
        case 'SELECT_DICE':
            return {
                Dices: selectDice(state.Dices, payload),
                Players: state.Players,
            };
        case 'ROLL_DICE':
            return (rollDice(state, payload));
        case 'ADD_PLAYER':
            return {
                Dices: state.Dices,
                Players: addPlayer(state.Players, payload)
            };
        case 'SET_NEW_PLAYER_NAME':
            return {
                ...state, Players:
                {
                    ...state.Players, newPlayerName: payload
                }
            }
        case 'START_GAME':
            return {
                Dices: state.Dices,
                Players: startGame(state.Players, payload)
            };
        case 'CROSS_OUT':
            return {
                Dices: store.Dices,
                Players: crossOut(state.Players, payload)
            };
        default:
            return state;

    }
}

export default createStore(rootReducer, applyMiddleware(logger));