import React from "react";
import "./index.scss";
import Header from "../../components/header";
import { connect } from "react-redux";
import axios from "axios";

class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "wp-json/wp/v2/video?per_page=100",
      movies: []
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
          users: response.data
        });
      })
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.changeCredentials();
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  render() {
    return (
      <div className="video-store-container">
        <Header history={this.props.history} />
        Movie Store
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
