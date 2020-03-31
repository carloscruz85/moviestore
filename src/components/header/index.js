import React from "react";
import "./index.scss";
import cookie from "react-cookies";
import { FiLogIn, FiLogOut, FiSettings, FiUser, FiFilm } from "react-icons/fi";
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
    this.goToMovieStore = this.goToMovieStore.bind(this);
  }

  goToMovieStore() {
    this.props.history.push("/moviestore");
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
        isLogin: false,
        currentUser: {
          id: -1
        }
      });
      this.goToMovieStore();
    } else {
      if (user.user_role[0] === "administrator") {
        this.props.sendLoginDataInner({
          isAdmin: true,
          isLogin: true,
          currentUser: user
        });
      } else {
        this.props.sendLoginDataInner({
          isAdmin: false,
          isLogin: true,
          currentUser: user
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
      <div className="icons-group">
        {isAdmin ? (
          <section>
            <FiUser
              className="pag big"
              onClick={this.goToLogUserAdmin.bind(this)}
            />
          </section>
        ) : null}
        {!isLogin ? (
          <FiLogIn className="pag big" onClick={this.goToLogin.bind(this)} />
        ) : (
          <section>
            <FiFilm
              className="pag big"
              onClick={this.goToMovieStore.bind(this)}
            />
            <FiSettings
              className="pag big"
              onClick={this.goToLogDashboard.bind(this)}
            />
            <FiLogOut
              className="pag big"
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
