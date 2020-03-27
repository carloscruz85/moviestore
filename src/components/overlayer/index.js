import React from 'react';
import './index.scss';
class OverLayer extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
      return(
        <div className="overlayer">
          {this.props.msg}
        </div>
      )
    }
}


export default OverLayer
