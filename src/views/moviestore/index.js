import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";
import { FiFilm, FiMoreHorizontal } from "react-icons/fi";

class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/video?per_page=100",
      movies: [],
      showForm: true
    };

    this.loadVideos = this.loadVideos.bind(this);
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

  render() {
    let { movies, showForm } = this.state;
    return (
      <div className="video-store-container">
        <Header history={this.props.history} />
        <div className="movie-container">
          {movies.map((movie, imovie) => {
            // console.log(movie.fimg_url);

            return (
              <div
                key={imovie}
                className="movie-card"
                style={{ backgroundImage: `url(${movie.fimg_url})` }}
              >
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
