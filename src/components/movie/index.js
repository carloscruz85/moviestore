import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import Input from "../../components/inputs/input";
import Textarea from "../../components/inputs/textarea";
import CheckBox from "../../components/inputs/checkbox";
import { FiSave, FiXCircle, FiTrash2, FiMenu } from "react-icons/fi";
// import StringToJson from "../../logic/stringToJson";
import { IoIosHeartDislike, IoIosHeart } from "react-icons/io";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogs: false
    };
  }

  switchLogs() {
    this.setState(prevState => ({
      showLogs: !prevState.showLogs
    }));
  }
  render() {
    const { movie } = this.props;

    let log_changes = JSON.parse(movie.log_changes);
    // console.log(StringToJson());

    return (
      <div>
        <div
          className="movie-card"
          style={{ backgroundImage: `url(${movie.imageurl})` }}
          onClick={() => this.props.switchDescription(movie.id)}
        ></div>
        <div>
          {movie.show === "true" ? (
            <div className="movie-description">
              <div className="form-container">
                {this.props.isAdmin ? (
                  <div>
                    <div>
                      <Input
                        label="Title"
                        type="text"
                        name={movie.id + "|title"}
                        value={movie.title.rendered}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <Textarea
                        label="Description"
                        type="text"
                        name={movie.id + "|description"}
                        value={movie.description}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <Input
                        label="Image Url"
                        type="text"
                        name={movie.id + "|imageurl"}
                        value={movie.imageurl}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <Input
                        label="Stock"
                        type="number"
                        name={movie.id + "|stock"}
                        value={movie.stock}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <Input
                        label="Rental Price"
                        type="number"
                        name={movie.id + "|rental_price"}
                        value={movie.rental_price}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <Input
                        label="Sale Price"
                        type="number"
                        name={movie.id + "|sale_price"}
                        value={movie.sale_price}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                      <CheckBox
                        label="Availability"
                        type="text"
                        name={movie.id + "|availability"}
                        value={movie.availability}
                        customChange={this.props.handleMovieInput.bind(this)}
                      />
                    </div>
                    {this.state.showLogs ? (
                      <div className="logs">
                        <h3 className="color-red">Movie logs</h3>
                        {log_changes.map((log, ilog) => {
                          return (
                            <div key={ilog} className="log-item">
                              <p className="color-yellow">{log.date}</p>
                              <p>title: {log.title}</p>
                              <p>Rental Price: {log.rental_price}</p>
                              <p>Sale Price: {log.sale_price}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <h3>
                      {movie.title.rendered} ({this.props.getLikes(movie.id)}
                      Likes)
                    </h3>
                    {this.props.adminId !== -1 ? (
                      <div className="color-yellow ">
                        {this.props.iLiked(movie.id) ? (
                          <button onClick={() => this.props.like(movie.id)}>
                            {" "}
                            Dislike
                            <IoIosHeartDislike />
                          </button>
                        ) : (
                          <button onClick={() => this.props.like(movie.id)}>
                            {" "}
                            Like
                            <IoIosHeart />
                          </button>
                        )}
                      </div>
                    ) : null}

                    <p className="card-list">
                      Description: {movie.description}
                    </p>
                    <p className="card-list">
                      Rental Price: ${movie.rental_price} <button>Rent </button>
                    </p>
                    <p className="card-list">Sale Price: ${movie.sale_price}</p>
                  </div>
                )}
                <div className="paginator-container">
                  {this.props.isAdmin ? (
                    <FiSave
                      className="pag big green-button"
                      onClick={() => this.props.saveMovie(movie.id)}
                    />
                  ) : null}
                  {this.props.isAdmin ? (
                    <FiTrash2
                      className="pag big red-button"
                      onClick={() => this.props.deleteMovie(movie.id)}
                    />
                  ) : null}

                  {this.props.isAdmin ? (
                    <FiMenu
                      className="pag big blue-button"
                      onClick={() => this.switchLogs()}
                    />
                  ) : null}

                  <FiXCircle
                    className="pag big yellow-button"
                    onClick={() => this.props.switchDescription(movie.id)}
                  />
                </div>
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
  like: PropTypes.func.isRequired,
  adminId: PropTypes.number.isRequired
};
export default Movie;
