import React from "react";
import cookie from "react-cookies";

class LogOut extends React.Component {
  componentDidMount() {
    cookie.remove("user", { path: "/" });
    this.props.history.push("/");
  }

  render() {
    return <div>LogOut</div>;
  }
}

export default LogOut;
