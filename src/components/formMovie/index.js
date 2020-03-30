import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import Input from "../inputs/input";

class FormMovie extends React.Component {
  render() {
    return (
      <div className="form-container">
        <Input
          label="Title"
          type="text"
          name="title"
          value={this.props.title}
          customChange={this.props.handleChange.bind(this)}
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={this.props.description}
          customChange={this.props.handleChange.bind(this)}
        />
        {/* <label>
              <input type="file" onChange={this.propschangeImage} />
            </label> */}
        <Input
          label="Stock"
          type="number"
          name="stock"
          value={this.props.stock}
          customChange={this.props.handleChange.bind(this)}
        />
        <Input
          label="Rental Price"
          type="number"
          name="rentalPrice"
          value={this.props.rentalPrice}
          customChange={this.props.handleChange.bind(this)}
        />
        <Input
          label="Sale Price"
          type="number"
          name="salePrice"
          value={this.props.salePrice}
          customChange={this.props.handleChange.bind(this)}
        />

        <button className="green-button" onClick={this.props.createMovie}>
          Create Movie
        </button>
        <button onClick={this.props.showForm}>Close</button>
      </div>
    );
  }
}

FormMovie.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  rentalPrice: PropTypes.number.isRequired,
  salePrice: PropTypes.number.isRequired,
  createMovie: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  showForm: PropTypes.func.isRequired
};
export default FormMovie;
