import React from 'react';
import './index.scss';

class Button extends React.Component{

  render(){
      return(
      <button className="pink-button" onClick={() => {this.props.customClickEvent()}}>{this.props.text}</button>
      )
    }
}

export default Button;
