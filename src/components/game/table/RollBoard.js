import RollableDice from './RollableDice'
import React, { Component } from 'react';
import { connect } from 'react-redux'

class RollBoard extends Component {
    constructor(props){ 
      super(props) 
    }
    
render (){
    return (
        
        <div className="rolling_board">
        <div >
            <img className="board_title" alt="title" src={process.env.PUBLIC_URL + "/roll_board.png"}/>
        </div>
        <div className="line"></div>
        <div className="diceContainer">
            {console.log(this.props)}
        {this.props.store.rollThrown === true && <RollableDice store={this.props.store}/>} </div>
        <div><div className="line"></div>
            <img className="board_title" alt="title" src={process.env.PUBLIC_URL + "/selected_value.png"}/>
            </div>
                
        <div className="select_value_container">
        <div className="value">{this.props.store.selected_value}</div>

        </div>
    </div>)
    } 
}


export default connect()(RollBoard)
