import React from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {login} from '../../actionCreators';
import Overlay from '../../components/overlayer'


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showOverlay: true,
      overlayMsg: 'msg'
    }
  }

  login(){

  }

  render(){
    const {showOverlay, overlayMsg} = this.state
    return (
      <div className="login">
        { showOverlay ? <Overlay msg={overlayMsg}/> : null}
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
