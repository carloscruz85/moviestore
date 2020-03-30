import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import cookie from "react-cookies";
import Overlay from "../../components/overlayer";
import Movie from "../../components/movie";
import FormMovie from "../../components/formMovie";

class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterByLike: false,
      url: "wp-json/wp/v2/video?per_page=100",
      urlPost: "wp-json/wp/v2/video",
      mediaUrl: "wp-json/wp/v2/media/",
      showOverlay: false,
      overlayMsg: "",
      movies: [],
      showForm: false,
      title: "title from app",
      description: "description",
      stock: 0,
      rentalPrice: 0,
      salePrice: 0,
      availability: 0
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
    this.deleteMovie = this.deleteMovie.bind(this);
    this.like = this.like.bind(this);
    this.filterByLike = this.filterByLike.bind(this);
    this.filterByName = this.filterByName.bind(this);
  }

  filterByName() {
    let { movies } = this.state;
    movies.sort((a, b) => {
      // console.log(aa, bb);

      if (a.title.rendered > b.title.rendered) return 1;
      if (a.title.rendered < b.title.rendered) return -1;
      return 0;
    });

    // console.log(movies);

    this.setState({
      movies: movies,
      filterByLike: false
    });
  }

  filterByLike() {
    let { movies } = this.state;
    movies.sort((a, b) => {
      let aa = JSON.parse(a.likes);
      let bb = JSON.parse(b.likes);
      // console.log(aa, bb);

      if (aa.length > bb.length) return -1;
      if (aa.length < bb.length) return 1;
      return 0;
    });

    // console.log(movies);

    this.setState({
      movies: movies,
      filterByLike: true
    });
  }

  iLiked(i) {
    let { movies } = this.state;
    let movie = movies[i];
    let likes = JSON.parse(movie.likes);
    return likes.includes(this.props.currentUser.id);
  }

  getLikes(i) {
    let { movies } = this.state;
    let movie = movies[i];
    let likes = JSON.parse(movie.likes);
    // console.log(likes.length);
    return likes.length;
  }

  like(i) {
    let { movies, filterByLike } = this.state;
    let movie = movies[i];
    let likes = JSON.parse(movie.likes);

    if (!likes.includes(this.props.currentUser.id)) {
      likes.push(this.props.currentUser.id);
    } else {
      let newLike = likes.filter(id => {
        return id !== this.props.currentUser.id;
      });
      likes = newLike;
    }
    movies[i].likes = JSON.stringify(likes);
    this.setState({
      movies: movies
    });
    this.saveMovie(i);

    if (filterByLike) {
      this.filterByLike();
    }
  }

  deleteMovie(movie) {
    const { urlPost, movies } = this.state;
    let dataMovies = movies[movie];
    var self = this;
    let host = this.props.host + urlPost + "/" + dataMovies.id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait deleting movie..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };

    // console.table(realData);

    axios
      .delete(host, { headers: myHeaders })
      .then(function(response) {
        // console.log(response);
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

  saveMovie(movie) {
    const { urlPost, movies } = this.state;

    let dataMovies = movies[movie];
    // console.clear();
    // console.table(dataMovies);

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
      availability: dataMovies.availability,
      likes: dataMovies.likes
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
      show: "false",
      likes: "[]"
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
        let movies = response.data;

        self.setState({
          movies: movies
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
        if (self.state.filterByLike === false) {
          self.filterByName();
        }
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
      filterByLike,
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
          <FormMovie
            title={title}
            description={description}
            stock={stock}
            rentalPrice={rentalPrice}
            salePrice={salePrice}
            availability={availability}
            createMovie={this.createMovie.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        ) : null}
        {filterByLike ? (
          <button onClick={() => this.filterByName()}>Filter by name</button>
        ) : (
          <button onClick={() => this.filterByLike()}>Filter by likes</button>
        )}
        <div className="movie-container">
          {this.props.isAdmin ? (
            <div
              className="movie-card add-movie"
              onClick={() => this.showForm()}
            >
              <FiPlusCircle /> Add
            </div>
          ) : null}

          {movies.map((movie, imovie) => {
            // console.log(movie);
            if (this.props.isAdmin === true || movie.availability > 0)
              return (
                <Movie
                  key={imovie}
                  movie={movie}
                  imovie={imovie}
                  switchDescription={this.switchDescription.bind(this)}
                  getLikes={this.getLikes.bind(this)}
                  iLiked={this.iLiked.bind(this)}
                  handleMovieInput={this.handleMovieInput.bind(this)}
                  isAdmin={this.props.isAdmin}
                  saveMovie={this.saveMovie.bind(this)}
                  deleteMovie={this.deleteMovie.bind(this)}
                  like={this.like.bind(this)}
                />
              );
            else return null;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    host: state.host,
    currentUser: state.currentUser,
    isLogin: state.isLogin,
    isAdmin: state.isAdmin
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
