import React from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {login} from '../../actionCreators';



class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  login(){

  }

  render(){
    return (
      <div className="login">
        login
      </div>
    )
  }
}


const mapStateToProps = state => {
	return {
			host: state.host
		}
}

const mapDispatchToProps = (dispatch) =>{
	return {
		login(data){
			dispatch(login(data));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
