import React from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import { addPlayer, setNewPlayerName, startGame } from '../actions/actionsPlayer';

const mapStateToProps = (state) => {
    return ({
        Players: state.Players.playerList,
        newPlayerName: state.Players.newPlayerName,
        start: state.Players.turn
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        addPlayer: () => dispatch(addPlayer()),
        setNewPlayerName: (event) => dispatch(setNewPlayerName(event.target.value)),
        startGame: () => dispatch(startGame()),
    })
}

const AllPlayers = ({ Players, newPlayerName, start, addPlayer, setNewPlayerName, startGame }) => {
    let keys = Object.keys(Players);
    if (keys.length < 5 && start === '') {
        return (
            <div>
                <div>
                    <input placeholder='Nombre jugador'
                        onChange={setNewPlayerName}
                        value={newPlayerName}
                    />
                    <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green ma3"
                        onClick={addPlayer}>
                        Agregar jugador</button>
                    <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green ma3"
                        onClick={startGame}>
                        Empezar</button>
                </div>
                <div className="flex items-center justify-center">
                    {keys.map(p => {
                        return (
                            <Player
                                key={Players[p].key}
                                name={Players[p].name}
                                scores={Players[p].score}
                                // turns={Players[p].turns}
                                total={Players[p].total} />
                        )
                    })}
                </div>
            </div>
        )
    } else {
        if (start === '') {
            return (
                <div>
                    <div>
                        <button className="f6 link dim ph3 pv2 mb2 dib white bg-dark-green ma3"
                            onClick={startGame}>
                            Empezar</button>
                    </div>
                    <div className="flex items-center justify-center">
                        {keys.map(p => {
                            return (
                                <Player
                                    key={Players[p].key}
                                    name={Players[p].name}
                                    scores={Players[p].score}
                                    // turns={Players[p].turns}
                                    total={Players[p].total} />
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex items-center justify-center">
                    {keys.map(p => {
                        if (Players[p].key === start) {
                            return (
                                <Player
                                    key={Players[p].key}
                                    name={Players[p].name}
                                    scores={Players[p].score}
                                    turns={Players[p].turns}
                                    total={Players[p].total} 
                                    className='outline w-200 pa3 mr2 ba bw3'/>
                            )
                        } else {
                            return (
                                <Player
                                    key={Players[p].key}
                                    name={Players[p].name}
                                    scores={Players[p].score}
                                    total={Players[p].total} />
                            )
                        }
                    })}
                </div>
            )
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllPlayers);