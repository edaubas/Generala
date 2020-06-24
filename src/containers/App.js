import React, { Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Dice from '../components/Dice';
import DiceButtons from '../components/DiceButtons';
import AllPlayers from '../components/AllPlayers';

const mapStateToProps = (state) => {
  return ({
    start: state.Players.turn
  })
}

class App extends React.Component {

  render() {
    if (this.props.start === '') {
      return (
        <Fragment>
          <h1>Generala</h1>
          <h2 className='tc'>Agregue jugadores y haga click en Empezar (max 5 jugadores)</h2>
          <div className="tc">
            <AllPlayers />
          </div >
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <h1>Generala</h1>
          <div className='tc'>
            <Dice />
          </div>
          <DiceButtons />
          <div className="tc">
            <AllPlayers />
          </div >
        </Fragment>
      )

    }
  }
}

export default connect(mapStateToProps)(App);
