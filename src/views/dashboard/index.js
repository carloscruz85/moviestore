import React from "react";
import "./index.scss";
import Header from "../../components/header";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="main-dashboard">
        <Header history={this.props.history} />
      </div>
    );
  }
}

export default Dashboard;
