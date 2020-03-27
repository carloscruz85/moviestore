import React from 'react';
import './index.scss';
import Header from '../../components/header'

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
      return(
        <div className="main-container">
          <Header />
          <div className="header">
          </div>
        </div>
      )
    }
}

export default Main;
