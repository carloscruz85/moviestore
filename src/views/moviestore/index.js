import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { FiFilm, FiMoreHorizontal } from "react-icons/fi";
import cookie from "react-cookies";

class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/video?per_page=100",
      urlPost: "wp-json/wp/v2/video",

      movies: [],
      showForm: true,
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
      rentalPrice: rentalPrice,
      salePrice: salePrice,
      availability: availability,
      status: "publish"
    };
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
        {showForm ? (
          <div className="form-container">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Stock:
              <input
                type="text"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Rental Price:
              <input
                type="text"
                name="rentalPrice"
                value={this.state.rentalPrice}
                onChange={this.handleChange}
              />
            </label>{" "}
            <label>
              Sale Price:
              <input
                type="text"
                name="salePrice"
                value={this.state.salePrice}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Availability:
              <input
                type="text"
                name="availability"
                value={this.state.availability}
                onChange={this.handleChange}
              />
            </label>
            <button onClick={this.createMovie}>Create Movie</button>
          </div>
        ) : null}
        <div className="movie-container">
          {movies.map((movie, imovie) => {
            // console.log(movie.fimg_url);

            return (
              <div
                key={imovie}
                className="movie-card"
                style={{ backgroundImage: `url(${movie.fimg_url})` }}
              >
                {movie.title.rendered}
                {/* <FiUserMinus
                  className="square-icon color-pink"
                  onClick={() => {
                    this.deleteUser(user.id);
                  }}
                /> */}
                <div>
                  {!movie.show ? (
                    <div className="movie-description">Description</div>
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
