import React from 'react';
import { connect } from 'react-redux';
import { selectDice } from '../actions/actionsDice';

const mapStateToProps = (state) => {
    return ({
        dices: state.Dices,
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({ selectDice: (a) => dispatch(selectDice(a)) })
}

const Dice = ({ dices, selectDice }) => {
    let keys = Object.keys(dices);
        return (
            keys.map(k => {
                return (
                    <div
                        className="tc ba flex-wrap inline-flex pa4 ma4 grow grow:hover"
                        key={dices[k].key}
                        style={dices[k].style}
                        onClick={() => selectDice(dices[k])}>
                        {dices[k].value}
                    </div>
                )
            }))
}

export default connect(mapStateToProps, mapDispatchToProps)(Dice);