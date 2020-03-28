import React from "react";
import "./index.scss";
import PropTypes from "prop-types";

class Button extends React.Component {
  render() {
    return (
      <button
        className="basic-button"
        onClick={() => {
          this.props.customClickEvent();
        }}
      >
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired
};

export default Button;
