import React from 'react';
import './index.scss';
import Button from '../../components/button'

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }
    this.goToLogin = this.goToLogin.bind(this)
  }

  goToLogin(){
    console.log('hi');
    
    this.props.history.push("/login/")
  }

  render(){
      return(
        <div className="main-container">
          <div className="header">
            <Button text="Login" customClickEvent={this.goToLogin.bind(this)} />
          </div>
        </div>
      )
    }
}

export default Main;
