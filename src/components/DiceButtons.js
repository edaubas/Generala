import React from 'react';
import { connect } from 'react-redux';
import RollButton from '../components/RollButton';
import SeleAllButton from '../components/SeleAllButton';


const mapStateToProps = (state) => {
    if (state.Players.winner === '') {
        return ({
            player: state.Players.playerList[state.Players.turn],
            winner: ''
        })
    } else {
        return ({
            player: state.Players.playerList[state.Players.turn],
            winner: state.Players.playerList[state.Players.winner].name
        })
    }
}

export const DiceButtons = ({player,winner}) => {

    if (winner !== '') {
        console.log(winner)
        return <h1> {winner} gano!!</h1>
    } else {
        if (player.turns) {
            return (
                <div className='tc pa1'>
                    <RollButton /><SeleAllButton />
                </div >
            )
        } else {
            return <h3 className='tc'>Seleccione un puntaje</h3>
        }
    }

}


export default connect(mapStateToProps)(DiceButtons);