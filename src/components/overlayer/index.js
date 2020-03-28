import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

class OverLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="overlayer">{this.props.msg}</div>;
  }
}

OverLayer.propTypes = {
  msg: PropTypes.string.isRequired
};
export default OverLayer;
