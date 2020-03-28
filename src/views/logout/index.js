import React from 'react';
import cookie from 'react-cookies'

class LogOut extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    cookie.remove('user', { path: '/' })
    this.props.history.push("/")
  }

  render(){
    return(
      <div>LogOut</div>
    )
  }
}

export default LogOut