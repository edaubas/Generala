import React from 'react';

const PlayerFooter = ({ turns, total }) => {
    return turns ?
        (
            <div className='tc'>
                <h3>
                    Turnos: {turns} -
        Total: {total}</h3>
            </div>
        )
        :
        (<div className='tc'><h3>Total: {total} </h3></div>)
}

export default PlayerFooter;