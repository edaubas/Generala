import React from 'react';
import { connect } from 'react-redux';
import { seleAll } from '../actions/actionsDice';

const mapStateToProps = (state) => {
    return ({ dices: state.DiceReducer })
}
const mapDispatchToProps = (dispatch) => {
    return ({ seleAll: () => dispatch(seleAll()) })
}

const SeleAllButton = ({dices, seleAll}) => {
        return (
            <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-blue ma3" 
            onClick={() => seleAll()}>Seleccionar todos</button>
        )
    }


export default connect(mapStateToProps, mapDispatchToProps)(SeleAllButton);