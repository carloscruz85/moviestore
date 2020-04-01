import React from "react";
import "./index.scss";
import { connect } from "react-redux";
import Overlay from "../../components/overlayer";
import cookie from "react-cookies";
import axios from "axios";
import { sendLoginData } from "../../store/actionCreators";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUrl: "wp-json/jwt-auth/v1/token",
      showOverlay: false,
      overlayMsg: "msg",
      username: "",
      password: "",
      userMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    this.setState({
      overlayMsg: "Please wait",
      showOverlay: true,
      userMsg: ""
    });
    const thisuser = {
      username: this.state.username,
      password: this.state.password
    };
    const mineHeaders = new Headers({ "Content-Type": "application/json" });
    const self = this;
    axios
      .post(this.props.host + this.state.loginUrl, thisuser, {
        headers: mineHeaders
      })
      .then(res => {
        if (res.status === 200) {
          // this.props.login(res.data)
          // console.clear();
          cookie.save("user", res.data, { path: "/" });
          // console.log(res)
          self.setState({
            msg: "",
            showOverlay: false
          });
          if (res.data.user_role[0] === "administrator") {
            this.props.sendLoginDataInner({
              isAdmin: true,
              isLogin: true,
              currentUser: res.data
            });
          } else {
            this.props.sendLoginDataInner({
              isAdmin: false,
              isLogin: true,
              currentUser: res.data
            });
          }
          this.props.history.push("/moviestore");
        }
      })
      .catch(error => {
        self.setState({
          userMsg: "Error en los accesos pruebe nuevamente",
          showOverlay: false
        });
        console.log("Error", error);
      })
      .then(function() {
        // self.setState({
        //   showOverlay: false
        // })
      });
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handlePassword(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { showOverlay, overlayMsg } = this.state;
    return (
      <div className="login-container">
        {showOverlay ? <Overlay msg={overlayMsg} /> : null}
        <div className="form-container">
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePassword}
            placeholder="password"
          />
          <button onClick={this.login}>Login</button>
          <div className="">{this.state.userMsg}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    host: state.host
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLoginDataInner(data) {
      dispatch(sendLoginData(data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
