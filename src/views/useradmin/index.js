import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { sendLoginData } from "../../store/actionCreators";
import Overlay from "../../components/overlayer";
import cookie from "react-cookies";
import { FiUserPlus } from "react-icons/fi";
import Button from "../../components/buttons/button";

class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/users",
      users: [],
      showOverlay: false,
      overlayMsg: "",
      userMsg: "",
      username: "juancito",
      password: "juancito",
      email: "juancito@dixp.net",
      showForm: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.createUser = this.createUser.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.changeCredentials = this.changeCredentials.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  showForm() {
    let showForm = !this.state.showForm;
    this.setState({
      showForm: showForm
    });
  }

  loadUsers() {
    var self = this;
    let url = this.props.host + this.state.url;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait loading users"
    });
    axios
      .get(url)
      .then(function(response) {
        //console.log("data received", response);
        self.setState({
          users: response.data
        });
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.changeCredentials();
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  createUser() {
    const { username, password, email, url } = this.state;
    var self = this;
    let host = this.props.host + url;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait creating user..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let realData = {
      username: username,
      password: password,
      email: email
    };
    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
        self.loadUsers();
        self.showForm();
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  changeCredentials() {
    this.setState({
      username: Math.floor(Math.random() * 10000).toString(10) + "dixp",
      email: Math.floor(Math.random() * 10000).toString(10) + "@dixp.net"
    });
  }

  componentDidMount() {
    this.loadUsers();
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
    const { users, showOverlay, overlayMsg, userMsg, showForm } = this.state;
    return (
      <div className="usermain-container">
        <Header history={this.props.history} />
        {showOverlay ? <Overlay msg={overlayMsg} /> : null}
        {showForm ? (
          <div className="form-container">
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            <button onClick={this.createUser}>Create user</button>
            <div className="">{this.state.userMsg}</div>
          </div>
        ) : (
          <b
            className="color-pink"
            onClick={() => {
              this.showForm();
            }}
          >
            Add User <FiUserPlus className="icon-button" />
          </b>
        )}

        {userMsg}
        {users.map((user, iuser) => {
          if (this.props.currentUser.id !== user.id)
            return <div key={iuser}>{user.name}</div>;
          else return null;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    host: state.host,
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLoginDataInner(data) {
      dispatch(sendLoginData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
