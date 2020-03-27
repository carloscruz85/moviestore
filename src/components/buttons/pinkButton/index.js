import React from 'react';
import Button from '../button'
import './index.scss';

class PinkButton extends React.Component{

  render(){
      return(
      <button className="pink-button" onClick={() => {this.props.customClickEvent()}}>{this.props.text}</button>
      )
    }
}

export default PinkButton;
