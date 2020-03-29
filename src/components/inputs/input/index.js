import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

class Input extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}:
        <input
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.customChange}
        />
      </label>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customChange: PropTypes.func.isRequired
};

export default Input;
