import React from 'react';
import { connect } from 'react-redux';
import { rollDice } from '../actions/actionsDice';

const mapStateToProps = (state) => {
    return ({ 
        turn: state.Players.turn,
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ rollDice: (a) =>  dispatch(rollDice(a)) })
}

const RollButton = ({turn, rollDice}) => {
        return (
            <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue ma3" 
            onClick={() => rollDice(turn)}>Tirar dados</button>
        )
    }

export default connect(mapStateToProps, mapDispatchToProps)(RollButton);