import React from "react";
import "./index.scss";
import Header from "../../components/header";

class Main extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Header history={this.props.history} />
      </div>
    );
  }
}

export default Main;
