import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import cookie from "react-cookies";
import Overlay from "../../components/overlayer";
class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/video?per_page=100",
      urlPost: "wp-json/wp/v2/video",
      mediaUrl: "wp-json/wp/v2/media/",
      showOverlay: false,
      overlayMsg: "",
      movies: [],
      showForm: false,
      title: "title from app",
      description: "description",
      stock: "stock",
      rentalPrice: "10",
      salePrice: "100",
      availability: "5"
    };

    this.loadVideos = this.loadVideos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.showForm = this.showForm.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.switchDescription = this.switchDescription.bind(this);
    this.handleMovieInput = this.handleMovieInput.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
  }

  saveMovie(movie) {
    const { urlPost, movies } = this.state;

    let dataMovies = movies[movie];
    console.clear();
    console.table(dataMovies);

    var self = this;
    let host = this.props.host + urlPost + "/" + dataMovies.id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait saving movie..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let realData = {
      title: dataMovies.title.rendered,
      description: dataMovies.description,
      stock: dataMovies.stock,
      rental_price: dataMovies.rental_price,
      sale_price: dataMovies.sale_price,
      availability: dataMovies.availability
    };
    // console.table(realData);

    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
        // console.log(response);
        // self.loadVideos();
        // self.showForm();
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  handleMovieInput(e) {
    const { value, name } = e.target;
    const data = name.split("|");
    let movies = this.state.movies;

    if (data[1] === "title") {
      movies[data[0]][data[1]].rendered = value;
    } else {
      movies[data[0]][data[1]] = value;
    }

    this.setState({
      movies: movies
    });
  }

  switchDescription(i) {
    let status = "false";
    let movies = this.state.movies;
    if (movies[i].show === "false") status = "true";
    movies[i].show = status;
    this.setState({
      movies: movies
    });
  }

  uploadImage(masterFile) {
    const file = masterFile[0];
    // console.log(file.type);

    const { mediaUrl } = this.state;
    var self = this;
    let host = this.props.host + mediaUrl;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait Upload the image..."
    });
    let user = cookie.load("user");
    const myHeaders = {
      Authorization: "Bearer " + user.token
      // "Content-Type": "multipart/form-data boundary=__boundrytext__"
      // "Content-Disposition": "attachment; filename=" + file.name
    };
    let realData = {
      title: "image from app",
      // file: {
      //   uri: "base64",
      //   name: file.name,
      //   type: file.type
      // },
      caption: "image from app",
      media_type: file.type,
      status: "publish"
    };
    console.log(realData);

    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
        console.log(response);

        self.loadVideos();
        // self.showForm();
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {});
  }

  changeImage(e) {
    const file = Array.from(e.target.files);
    // console.log();
    this.uploadImage(file);
  }

  showForm() {
    let showForm = !this.state.showForm;
    this.setState({
      showForm: showForm
    });
  }

  createMovie() {
    const {
      title,
      description,
      stock,
      rentalPrice,
      salePrice,
      availability,
      urlPost
    } = this.state;
    var self = this;
    let host = this.props.host + urlPost;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait creating movie..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let realData = {
      title: title,
      description: description,
      stock: stock,
      rental_price: rentalPrice,
      sale_price: salePrice,
      availability: availability,
      status: "publish",
      show: "false"
    };
    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
        console.log(response);

        self.loadVideos();
        self.showForm();
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  loadVideos() {
    var self = this;
    let url = this.props.host + this.state.url;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait loading movies"
    });
    axios
      .get(url)
      .then(function(response) {
        // console.log("data received", response);
        self.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        // self.changeCredentials();
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  componentDidMount() {
    this.loadVideos();
  }

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      showOverlay,
      overlayMsg,
      movies,
      showForm,
      title,
      description,
      stock,
      rentalPrice,
      salePrice,
      availability
    } = this.state;
    return (
      <div className="video-store-container">
        <Header history={this.props.history} />
        {showOverlay ? <Overlay msg={overlayMsg} /> : null}
        {showForm ? (
          <div className="form-container">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input type="file" onChange={this.changeImage} />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={description}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Stock:
              <input
                type="text"
                name="stock"
                value={stock}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Rental Price:
              <input
                type="text"
                name="rentalPrice"
                value={rentalPrice}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Sale Price:
              <input
                type="text"
                name="salePrice"
                value={salePrice}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Availability:
              <input
                type="text"
                name="availability"
                value={availability}
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.createMovie}>Create Movie</button>
          </div>
        ) : null}

        <div className="movie-container">
          <div className="movie-card add-movie" onClick={() => this.showForm()}>
            <FiPlusCircle /> Add
          </div>
          {movies.map((movie, imovie) => {
            // console.log(movie);

            return (
              <div key={imovie}>
                <div
                  className="movie-card"
                  style={{ backgroundImage: `url(${movie.fimg_url})` }}
                  onClick={() => this.switchDescription(imovie)}
                ></div>
                <div>
                  {movie.show === "true" ? (
                    <div className="movie-description">
                      <div className="form-container">
                        <label>
                          Title:
                          <input
                            type="text"
                            name={imovie + "|title"}
                            value={movie.title.rendered}
                            onChange={this.handleMovieInput}
                          />
                        </label>
                        <label>
                          Description:
                          <input
                            type="text"
                            name={imovie + "|description"}
                            value={movie.description}
                            onChange={this.handleMovieInput}
                          />
                        </label>
                        <label>
                          Stock:
                          <input
                            type="text"
                            name={imovie + "|stock"}
                            value={movie.stock}
                            onChange={this.handleMovieInput}
                          />
                        </label>
                        <label>
                          Rental Price:
                          <input
                            type="text"
                            name={imovie + "|rental_price"}
                            value={movie.rental_price}
                            onChange={this.handleMovieInput}
                          />
                        </label>{" "}
                        <label>
                          Sale Price:
                          <input
                            type="text"
                            name={imovie + "|sale_price"}
                            value={movie.sale_price}
                            onChange={this.handleMovieInput}
                          />
                        </label>
                        <label>
                          Availability:
                          <input
                            type="text"
                            name={imovie + "|availability"}
                            value={movie.availability}
                            onChange={this.handleMovieInput}
                          />
                        </label>
                        <button onClick={() => this.saveMovie(imovie)}>
                          Save Movie
                        </button>
                        <button onClick={() => this.switchDescription(imovie)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    host: state.host,
    currentUser: state.currentUser
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     sendLoginDataInner(data) {
//       dispatch(sendLoginData(data));
//     }
//   };
// };

export default connect(mapStateToProps)(VideoStore);
