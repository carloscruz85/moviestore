import React from 'react';
import './index.scss';
import cookie from 'react-cookies'
import PinkButton from '../buttons/pinkButton'


class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        isLogin: false
    }
    this.goToLogin = this.goToLogin.bind(this);
    this.goToLogOut = this.goToLogOut.bind(this);

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
                <PinkButton text="Login" customClickEvent={this.goToLogin.bind(this)} />
                : 
                <PinkButton text="LogOut" customClickEvent={this.goToLogOut.bind(this)} />

            }
        </div>
      )
    }
}


export default Header
