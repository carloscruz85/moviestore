import React from "react";
import "./index.scss";
import cookie from "react-cookies";
import { FiLogIn, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { connect } from "react-redux";
import { sendLoginData } from "../../store/actionCreators";
import PropTypes from "prop-types";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToLogOut = this.goToLogOut.bind(this);
    this.goToLogDashboard = this.goToLogDashboard.bind(this);
    this.goToLogUserAdmin = this.goToLogUserAdmin.bind(this);
  }

  goToLogUserAdmin() {
    this.props.history.push("/useradmin");
  }

  goToLogDashboard() {
    this.props.history.push("/dashboard");
  }

  goToLogin() {
    this.props.history.push("/login");
  }

  goToLogOut() {
    this.props.history.push("/logout/");
  }

  componentDidMount() {
    let user = cookie.load("user");

    if (user === undefined) {
      this.props.sendLoginDataInner({
        isAdmin: false,
        isLogin: false
      });
      this.goToLogDashboard();
    } else {
      if (user.user_role[0] === "administrator") {
        this.props.sendLoginDataInner({
          isAdmin: true,
          isLogin: true
        });
      } else {
        this.props.sendLoginDataInner({
          isAdmin: false,
          isLogin: true
        });
      }
    }
  }

  sendLoginDataInner(data) {
    return sendLoginData(data);
  }

  render() {
    const { isLogin, isAdmin } = this.props;
    return (
      <div className="header-container">
        {isAdmin ? (
          <section>
            <FiUser
              className="icon-button"
              onClick={this.goToLogUserAdmin.bind(this)}
            />
          </section>
        ) : null}
        {!isLogin ? (
          <FiLogIn
            className="icon-button"
            onClick={this.goToLogin.bind(this)}
          />
        ) : (
          <section>
            <FiSettings
              className="icon-button"
              onClick={this.goToLogDashboard.bind(this)}
            />
            <FiLogOut
              className="icon-button"
              onClick={this.goToLogOut.bind(this)}
            />
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    isAdmin: state.isAdmin
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendLoginDataInner(data) {
      dispatch(sendLoginData(data));
    }
  };
};

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
