import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

class Textarea extends React.Component {
  render() {
    return (
      <label>
        {this.props.label}:
        <textarea
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.customChange}
        ></textarea>
      </label>
    );
  }
}

Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  customChange: PropTypes.func.isRequired
};

export default Textarea;
