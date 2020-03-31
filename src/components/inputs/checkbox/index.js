import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

class Checkbox extends React.Component {
  render() {
    let boolVal = false;
    if (this.props.value === "true") boolVal = true;
    return (
      <label>
        {this.props.label}:
        <input
          name={this.props.name}
          type="checkbox"
          checked={boolVal}
          onChange={this.props.customChange}
        />
      </label>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customChange: PropTypes.func.isRequired
};

export default Checkbox;
