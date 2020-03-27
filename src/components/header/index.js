import React from 'react';
import './index.scss';
import cookie from 'react-cookies'
import PinkButton from '../buttons/pinkButton'
import { FiLogIn, FiLogOut, FiSettings } from "react-icons/fi";


class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        isLogin: false
    }
    this.goToLogin = this.goToLogin.bind(this);
    this.goToLogOut = this.goToLogOut.bind(this);
    this.goToLogDashboard = this.goToLogDashboard.bind(this);

  }

  goToLogDashboard(){
    this.props.history.push("/dashboard")
  }

  goToLogin(){
    // console.log('login', this.props);
    this.props.history.push("/login")
  }

  goToLogOut(){    
    this.props.history.push("/logout/")
  }

  componentDidMount(){
    let user = cookie.load('user')
    if(user === undefined){
        this.setState({
            isLogin: false
        })
    }else{
        this.setState({
            isLogin: true
        })
    }    
  }

  render(){
      const {isLogin} = this.state
      return(
        <div className="header-container">
            {
                !isLogin ? 
                <FiLogIn onClick={this.goToLogin.bind(this)} />
                : 
                <div>
                    <FiSettings onClick={this.goToLogDashboard.bind(this)}/>
                    <FiLogIn onClick={this.goToLogOut.bind(this)}/>
                </div>

            }
        </div>
      )
    }
}


export default Header
