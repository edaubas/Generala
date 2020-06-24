import React from 'react';
import { connect } from 'react-redux';
import PlayerFooter from './PlayerFooter'
import { crossOut } from '../actions/actionsPlayer';

const mapStateToProps = (state) => {
    return ({})
}

const mapDispatchToProps = (dispatch) => {
    return ({
        crossOut: (k) => dispatch(crossOut(k))
    })

}

const Player = ({ key_val, name, scores, turns, crossOut, total,className = 'outline w-200 pa3 mr2' }) => {
    let keys = Object.keys(scores);

    return (
        <div className={className}><h2 key={key_val}>{name}</h2>
            {
                keys.map(k => {
                    if (!scores[k].score) {
                        return <p
                            className={scores[k].className}
                            key={scores[k].key}>
                            {scores[k].text}
                        </p>
                    } else if (scores[k].score >= 0) {
                        if (scores[k].croseed_out) {
                            return <p
                                className={scores[k].className}
                                key={scores[k].key}>
                                {scores[k].text} - Puntos: {scores[k].score}
                            </p>
                        } else {
                            return <p
                                className={scores[k].className}
                                key={scores[k].key}
                                onClick={() => crossOut(k)}>
                                {scores[k].text} - Puntos: {scores[k].score}
                            </p>
                        }
                    } else {
                        return <p
                            className={scores[k].className}
                            key={scores[k].key}
                            onClick={() => crossOut(k)}>
                            {scores[k].text} - Sin puntos
                        </p>
                    }
                })
            }
            <PlayerFooter turns={turns} total={total} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);