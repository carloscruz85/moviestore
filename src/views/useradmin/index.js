import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { sendLoginData } from "../../store/actionCreators";
import Overlay from "../../components/overlayer";

class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/users",
      users: [],
      showOverlay: false,
      overlayMsg: "",
      userMsg: ""
    };
  }

  componentDidMount() {
    var self = this;
    let url = this.props.host + this.state.url;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait loading users"
    });
    axios
      .get(url)
      .then(function(response) {
        console.log("data received", response);
        self.setState({
          users: response.data
        });
      })
      .catch(function(error) {
        // handle error
      })
      .then(function() {
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  render() {
    const { users, showOverlay, overlayMsg, userMsg } = this.state;
    return (
      <div className="main-dashboard">
        <Header history={this.props.history} />
        {showOverlay ? <Overlay msg={overlayMsg} /> : null}
        {userMsg}
        {users.map((user, iuser) => {
          return <div key={iuser}>{user.name}</div>;
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
