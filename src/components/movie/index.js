import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import Input from "../inputs/input";
import { IoIosHeartDislike, IoIosHeart } from "react-icons/io";

class Movie extends React.Component {
  render() {
    const { movie, imovie } = this.props;
    return (
      <div>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${movie.fimg_url})` }}
          onClick={() => this.props.switchDescription(imovie)}
        ></div>
        <div>
          {movie.show === "true" ? (
            <div className="movie-description">
              <div className="form-container">
                {this.props.isAdmin ? (
                  <div>
                    <Input
                      label="Title"
                      type="text"
                      name={imovie + "|title"}
                      value={movie.title.rendered}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />
                    <Input
                      label="Description"
                      type="text"
                      name={imovie + "|description"}
                      value={movie.description}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />
                    <Input
                      label="Stock"
                      type="number"
                      name={imovie + "|stock"}
                      value={movie.stock}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />
                    <Input
                      label="Rental Price"
                      type="number"
                      name={imovie + "|rental_price"}
                      value={movie.rental_price}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />
                    <Input
                      label="Sale Price"
                      type="number"
                      name={imovie + "|sale_price"}
                      value={movie.sale_price}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />
                    <Input
                      label="Availability"
                      type="number"
                      name={imovie + "|availability"}
                      value={movie.availability}
                      customChange={this.props.handleMovieInput.bind(this)}
                    />

                    <button
                      className="green-button"
                      onClick={() => this.props.saveMovie(imovie)}
                    >
                      Save Movie
                    </button>
                    <button
                      className="yellow-button"
                      onClick={() => this.props.deleteMovie(imovie)}
                    >
                      Delete Movie
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3>{movie.title.rendered}</h3>
                    <div className="color-yellow">
                      {this.props.getLikes(imovie)} <div>Likes</div>
                      {this.props.iLiked(imovie) ? (
                        <IoIosHeartDislike
                          className="color-red"
                          onClick={() => this.props.like(imovie)}
                        />
                      ) : (
                        <IoIosHeart
                          className="color-red"
                          onClick={() => this.props.like(imovie)}
                        />
                      )}
                    </div>
                    <p className="card-list">
                      Description: {movie.description}
                    </p>
                    <p className="card-list">
                      Rental Price: ${movie.rental_price}
                    </p>
                    <p className="card-list">Sale Price: ${movie.sale_price}</p>
                  </div>
                )}

                <button onClick={() => this.props.switchDescription(imovie)}>
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  imovie: PropTypes.number.isRequired,
  switchDescription: PropTypes.func.isRequired,
  getLikes: PropTypes.func.isRequired,
  iLiked: PropTypes.func.isRequired,
  handleMovieInput: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  saveMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired
};
export default Movie;
