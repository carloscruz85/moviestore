import React from "react";
import PropTypes from "prop-types";

class MultipleInput extends React.Component {
  render() {
    console.log(this.props.data);

    return <div>Hi</div>;
  }
}

// Input.propTypes = {
//   label: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   customChange: PropTypes.func.isRequired
// };

export default MultipleInput;
