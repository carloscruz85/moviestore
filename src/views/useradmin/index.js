import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { sendLoginData } from "../../store/actionCreators";
import Overlay from "../../components/overlayer";
import cookie from "react-cookies";
import { FiUserPlus, FiUser } from "react-icons/fi";
import PinkButton from "../../components/buttons/pinkButton";
import Button from "../../components/buttons/button";

class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/users?per_page=100",
      urlDelete: "wp-json/wp/v2/users",
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
    this.deleteUser = this.deleteUser.bind(this);
    this.changeRol = this.changeRol.bind(this);
  }

  changeRol(id, newRol) {
    const { urlDelete } = this.state;
    var self = this;
    let host = this.props.host + urlDelete + "/" + id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let realData = {
      roles: [newRol]
    };
    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
        self.loadUsers();
        // self.showForm();
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

  deleteUser(id) {
    const { urlDelete } = this.state;
    var self = this;
    let host = this.props.host + urlDelete + "/" + id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let realData = {};
    axios
      .delete(host, realData, { headers: myHeaders })
      .then(function(response) {
        self.loadUsers();
        // self.showForm();
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
        // console.log("data received", response);
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
          <div
            className="item-list-green card-list"
            onClick={() => {
              this.showForm();
            }}
          >
            <FiUserPlus className="square-icon-green color-green" /> Add User
          </div>
        )}

        {userMsg}
        {users.map((user, iuser) => {
          if (this.props.currentUser.id !== user.id)
            return (
              <div key={iuser} className="card-list">
                {/* <FiUserMinus
                  className="square-icon color-pink"
                  onClick={() => {
                    this.deleteUser(user.id);
                  }}
                /> */}
                <div>
                  <FiUser /> {user.name}
                </div>
                {user.roles[0] === "editor" ? (
                  <PinkButton
                    text="                    Make Admin
                    "
                    customClickEvent={() => {
                      this.changeRol(user.id, "administrator");
                    }}
                  />
                ) : (
                  <Button
                    text="Make User"
                    customClickEvent={() => {
                      this.changeRol(user.id, "editor");
                    }}
                  />
                )}
              </div>
            );
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
