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
import Input from "../../components/inputs/input";
import { IoIosHeart } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

class VideoStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rentConf: {
        penalty: 5,
        days: 7
      },
      showSearcher: false,
      indexPagination: 0,
      paginationSize: 6,
      blocksPagination: [],
      searchFilter: "",
      filterByLike: false,
      url: "wp-json/wp/v2/video?per_page=100",
      urlPost: "wp-json/wp/v2/video",
      mediaUrl: "wp-json/wp/v2/media/",
      showOverlay: false,
      overlayMsg: "",
      movies: [],
      showForm: false,
      title: "",
      description: "",
      stock: 0,
      rentalPrice: 0,
      salePrice: 0,
      imageUrl: "",
      log_changes: "",
      log_users: ""
    };

    this.loadVideos = this.loadVideos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.showForm = this.showForm.bind(this);
    // this.changeImage = this.changeImage.bind(this);
    // this.uploadImage = this.uploadImage.bind(this);
    this.switchDescription = this.switchDescription.bind(this);
    this.handleMovieInput = this.handleMovieInput.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.like = this.like.bind(this);
    this.filterByLike = this.filterByLike.bind(this);
    this.filterByName = this.filterByName.bind(this);
    this.setSearchFilter = this.setSearchFilter.bind(this);
    this.matchTitle = this.matchTitle.bind(this);
    this.paginate = this.paginate.bind(this);
    this.setIndexPagination = this.setIndexPagination.bind(this);
    this.getIndexOfId = this.getIndexOfId.bind(this);
    this.repaginate = this.repaginate.bind(this);
    this.switchSearcher = this.switchSearcher.bind(this);
    this.rent = this.rent.bind(this);
    this.devolution = this.devolution.bind(this);
  }

  devolution(movieId, userId, userName) {
    const { urlPost, blocksPagination } = this.state;
    let arrow = this.getIndexOfId(movieId);
    let dataMovies = blocksPagination[arrow.block][arrow.index];

    var self = this;
    let host = this.props.host + urlPost + "/" + dataMovies.id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait making devolution..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };
    let current_log_users_aux = JSON.parse(dataMovies.log_users_aux);

    let currentUserLog = JSON.parse(dataMovies.log_users);
    // console.log(currentUserLog);

    let newUserLog = currentUserLog.filter(i => {
      // console.log(this.props.currentUser.id, i.userId);
      return i.userId !== userId;
    });

    // console.log(newUserLog);

    var d = new Date();
    let thisInteraction = {
      userId: userId,
      userName: userName,
      movieId: movieId,
      type: "devolution",
      date: d.getTime()
    };

    current_log_users_aux.push(thisInteraction);

    // currentUserLog.push(thisInteraction);
    // console.log(currentUserLog);

    let log_users = JSON.stringify(newUserLog);
    let log_users_aux = JSON.stringify(current_log_users_aux);

    //UPDATING STOCK
    let currentStock = parseInt(dataMovies.stock) + 1;

    let realData = {
      log_users: log_users,
      stock: currentStock,
      log_users_aux: log_users_aux
    };

    //UPDATE STATE
    blocksPagination[arrow.block][arrow.index].log_users = log_users;
    blocksPagination[arrow.block][arrow.index].log_users_aux = log_users_aux;
    blocksPagination[arrow.block][arrow.index].stock = currentStock;
    this.setState({
      blocksPagination: blocksPagination
    });

    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {})
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.repaginate();
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  rent(movieId) {
    const { urlPost, blocksPagination } = this.state;
    let arrow = this.getIndexOfId(movieId);
    let dataMovies = blocksPagination[arrow.block][arrow.index];

    var self = this;
    let host = this.props.host + urlPost + "/" + dataMovies.id;
    this.setState({
      showOverlay: true,
      overlayMsg: "Wait renting the movie..."
    });
    let user = cookie.load("user");
    const myHeaders = { Authorization: "Bearer " + user.token };

    //AUX LOGS
    let log_users_aux_prev = JSON.parse(dataMovies.log_users_aux);

    let currentUserLog = JSON.parse(dataMovies.log_users);
    var d = new Date();
    let thisInteraction = {
      userId: this.props.currentUser.id,
      userName: this.props.currentUser.user_nicename,
      movieId: movieId,
      type: "rent",
      date: d.getTime()
    };

    currentUserLog.push(thisInteraction);
    log_users_aux_prev.push(thisInteraction);
    // console.log(currentUserLog);

    let log_users = JSON.stringify(currentUserLog);
    let log_users_aux = JSON.stringify(log_users_aux_prev);

    //UPDATING STOCK
    let currentStock = dataMovies.stock - 1;

    let realData = {
      log_users: log_users,
      stock: currentStock,
      log_users_aux: log_users_aux
    };

    //UPDATE STATE
    blocksPagination[arrow.block][arrow.index].log_users = log_users;
    blocksPagination[arrow.block][arrow.index].log_users_aux = log_users_aux;
    blocksPagination[arrow.block][arrow.index].stock = currentStock;
    // blocksPagination[arrow.block][arrow.index].show = false;
    this.setState({
      blocksPagination: blocksPagination
    });

    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {})
      .catch(function(error) {
        self.setState({
          showOverlay: false,
          userMsg: "Error " + error + "Please contact to carloscruz85@gmail.com"
        });
      })
      .then(function() {
        self.repaginate();
        self.setState({
          showOverlay: false,
          overlayMsg: ""
        });
      });
  }

  switchSearcher() {
    this.setState(prevState => ({
      showSearcher: !prevState.showSearcher
    }));
  }

  setIndexPagination(i) {
    this.setState({
      indexPagination: i
    });
  }

  basicFilter(block) {
    let { paginationSize, searchFilter, filterByLike } = this.state;
    let matchs = block;

    //SEARCH FILTER
    matchs = matchs.filter(it =>
      new RegExp(searchFilter, "i").test(it.title.rendered)
    );
    //FILTER AVAIBLES
    if (!this.props.isAdmin) {
      matchs = matchs.filter(it => it.availability === "true");
      //FILTER IF STOCK
      matchs = matchs.filter(it => it.stock > 0);
    }

    //SORT
    if (filterByLike) {
      matchs.sort((a, b) => {
        let aa = JSON.parse(a.likes);
        let bb = JSON.parse(b.likes);

        if (aa.length > bb.length) return -1;
        if (aa.length < bb.length) return 1;
        return 0;
      });
    } else {
      matchs.sort((a, b) => {
        if (a.title.rendered > b.title.rendered) return 1;
        if (a.title.rendered < b.title.rendered) return -1;
        return 0;
      });
    }

    //DIVIDE IN CHUNKS
    const chunked_arr = [];
    for (let i = 0; i < matchs.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === paginationSize) {
        chunked_arr.push([matchs[i]]);
      } else {
        last.push(matchs[i]);
      }
    }

    return chunked_arr;
  }

  repaginate() {
    let { blocksPagination } = this.state;

    let matchs = blocksPagination.reduce((acc, it) => [...acc, ...it], []);

    this.setState({
      blocksPagination: this.basicFilter(matchs)
    });
  }

  paginate() {
    let { movies } = this.state;

    this.setState({
      blocksPagination: this.basicFilter(movies)
    });
    // this.forceUpdate();
  }

  matchTitle(id) {
    let { searchFilter, movies } = this.state;
    // if (searchFilter.length === 0) return true;
    let res = movies.filter(it =>
      new RegExp(searchFilter, "i").test(it.title.rendered)
    );
    if (res.some(user => user.id === id)) return true;
    else return false;
  }

  setSearchFilter(e) {
    const { value } = e.target;
    this.setState({
      searchFilter: value
    });
    this.paginate();
  }

  filterByName() {
    // console.log("filterByName");

    this.setState({
      filterByLike: false
    });
    this.repaginate();
  }

  filterByLike() {
    // console.log("filterByLike");

    this.setState({
      filterByLike: true
    });
    this.repaginate();
  }

  iLiked(i) {
    let { blocksPagination } = this.state;
    let arrow = this.getIndexOfId(i);
    let movie = blocksPagination[arrow.block][arrow.index];
    let likes = JSON.parse(movie.likes);
    return likes.includes(this.props.currentUser.id);
  }

  getLikes(i) {
    let { blocksPagination } = this.state;
    let arrow = this.getIndexOfId(i);
    let movie = blocksPagination[arrow.block][arrow.index];
    let likes = JSON.parse(movie.likes);
    // console.log(likes.length);
    return likes.length;
  }

  like(i) {
    let { blocksPagination, filterByLike } = this.state;
    let arrow = this.getIndexOfId(i);
    let movie = blocksPagination[arrow.block][arrow.index];

    let likes = JSON.parse(movie.likes);
    console.log(likes);

    if (!likes.includes(this.props.currentUser.id)) {
      likes.push(this.props.currentUser.id);
    } else {
      let newLike = likes.filter(id => {
        return id !== this.props.currentUser.id;
      });
      likes = newLike;
    }

    // console.log(blocksPagination[arrow.block][arrow.index]);

    blocksPagination[arrow.block][arrow.index].likes = JSON.stringify(likes);

    // console.log(movie[i].likes);

    this.setState({
      blocksPagination: blocksPagination
    });
    this.saveMovie(i);

    if (filterByLike) {
      this.filterByLike();
    }
  }

  deleteMovie(movie) {
    this.switchDescription(movie);
    const { urlPost } = this.state;
    var self = this;
    let host = this.props.host + urlPost + "/" + movie;
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
    const { urlPost, blocksPagination } = this.state;
    // this.switchDescription(movie);
    let arrow = this.getIndexOfId(movie);

    let dataMovies = blocksPagination[arrow.block][arrow.index];
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
    let prev = {
      title: dataMovies.title.rendered,
      description: dataMovies.description,
      stock: dataMovies.stock,
      rental_price: dataMovies.rental_price,
      sale_price: dataMovies.sale_price,
      availability: dataMovies.availability,
      likes: dataMovies.likes,
      imageurl: dataMovies.imageurl
    };
    let toUpdate = prev;
    //PREPARING LOG
    delete toUpdate.likes;

    toUpdate = {
      ...toUpdate,
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/")
    };

    let lastLogChanges = JSON.parse(dataMovies.log_changes);
    lastLogChanges.push(toUpdate);

    let realData = { ...prev, log_changes: JSON.stringify(lastLogChanges) };
    console.log(realData);

    //UPDATE STATE
    blocksPagination[arrow.block][arrow.index].log_changes = JSON.stringify(
      lastLogChanges
    );
    this.setState({
      blocksPagination: blocksPagination
    });

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
    const { value, name, type, checked } = e.target;
    const data = name.split("|");
    let blocksPagination = this.state.blocksPagination;

    let arrow = this.getIndexOfId(data);
    // console.log(data);
    // console.log(blocksPagination[arrow.block][arrow.index]);

    switch (type) {
      case "checkbox":
        let status = "false";
        if (checked) status = "true";
        blocksPagination[arrow.block][arrow.index][data[1]] = status;
        break;

      default:
        if (data[1] === "title") {
          blocksPagination[arrow.block][arrow.index].title.rendered = value;
        } else {
          blocksPagination[arrow.block][arrow.index][data[1]] = value;
        }
    }

    // console.log(blocksPagination[arrow.block][arrow.index]);

    this.setState({
      blocksPagination: blocksPagination
    });
  }

  getIndexOfId(id) {
    // console.log("in getIndex", id);

    let { blocksPagination } = this.state;
    let arrow = {
      block: 0,
      index: 0
    };

    for (let block = 0; block < blocksPagination.length; block++) {
      // console.log("In Block ", block);

      for (var index = 0; index < blocksPagination[block].length; index++) {
        // console.log(
        //   "In Block ",
        //   block,
        //   "Index ",
        //   index,
        //   blocksPagination[block][index].id
        // );
        let idr = parseInt(id, 10);
        let idf = parseInt(blocksPagination[block][index].id, 10);

        if (idr === idf) {
          // console.log(index, blocksPagination[block][index].id);
          arrow = {
            block: block,
            index: index
          };
        }
      }
    }
    // console.log(
    //   "movie to work ",
    //   blocksPagination[arrow.block][arrow.index].title.rendered
    // );

    // console.log(id, arrow);

    return arrow;
  }

  switchDescription(i) {
    let status = "false";
    let blocksPagination = this.state.blocksPagination;

    let arrow = this.getIndexOfId(i);

    if (blocksPagination[arrow.block][arrow.index].show === "false")
      status = "true";
    blocksPagination[arrow.block][arrow.index].show = status;
    this.setState({
      blocksPagination: blocksPagination
    });
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
      imageUrl,
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
      availability: "true",
      status: "publish",
      show: "false",
      likes: "[]",
      imageurl: imageUrl,
      log_changes: "[]",
      log_users: "[]",
      log_users_aux: "[]"
    };
    // console.log(realData);

    axios
      .post(host, realData, { headers: myHeaders })
      .then(function(response) {
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
          overlayMsg: "",
          title: "",
          description: "",
          stock: 0,
          rentalPrice: 0,
          salePrice: 0,
          imageUrl: ""
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
        self.paginate();
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
      rentConf,
      showSearcher,
      indexPagination,
      blocksPagination,
      searchFilter,
      filterByLike,
      showOverlay,
      overlayMsg,
      showForm,
      title,
      description,
      stock,
      rentalPrice,
      salePrice,
      imageUrl
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
            createMovie={this.createMovie.bind(this)}
            handleChange={this.handleChange.bind(this)}
            showForm={this.showForm.bind(this)}
            imageUrl={imageUrl}
          />
        ) : null}
        <div className="icons-group">
          {showSearcher ? (
            <div
              className="pag selected"
              onClick={() => {
                this.switchSearcher();
              }}
            >
              <FiSearch />
            </div>
          ) : (
            <div
              className="pag"
              onClick={() => {
                this.switchSearcher();
              }}
            >
              <FiSearch />
            </div>
          )}

          {filterByLike ? (
            <div className="pag selected" onClick={() => this.filterByName()}>
              <IoIosHeart />
            </div>
          ) : (
            <div className="pag" onClick={() => this.filterByLike()}>
              <IoIosHeart />
            </div>
          )}
        </div>
        {showSearcher ? (
          <div className="header-control">
            <Input
              label="Search"
              type="text"
              name="search"
              value={searchFilter}
              customChange={this.setSearchFilter.bind(this)}
            />
          </div>
        ) : null}

        {blocksPagination.length === 0 ? (
          <div className="movie-container">
            {this.props.isAdmin ? (
              <div
                className="movie-card add-movie"
                onClick={() => this.showForm()}
              >
                <FiPlusCircle /> Add
              </div>
            ) : null}
          </div>
        ) : (
          blocksPagination.map((block, iblock) => {
            // console.log(block);
            if (iblock === indexPagination)
              return (
                <div className="block" key={iblock}>
                  <div className="movie-container">
                    {this.props.isAdmin ? (
                      <div
                        className="movie-card add-movie"
                        onClick={() => this.showForm()}
                      >
                        <FiPlusCircle /> Add
                      </div>
                    ) : null}
                    {block.map((movie, imovie) => {
                      if (this.props.isAdmin || movie.availability === "true") {
                        return (
                          <Movie
                            key={imovie}
                            movie={movie}
                            imovie={imovie}
                            switchDescription={this.switchDescription.bind(
                              this
                            )}
                            getLikes={this.getLikes.bind(this)}
                            iLiked={this.iLiked.bind(this)}
                            handleMovieInput={this.handleMovieInput.bind(this)}
                            isAdmin={this.props.isAdmin}
                            isLogin={this.props.isLogin}
                            adminId={this.props.currentUser.id}
                            saveMovie={this.saveMovie.bind(this)}
                            deleteMovie={this.deleteMovie.bind(this)}
                            like={this.like.bind(this)}
                            rent={this.rent.bind(this)}
                            rentConf={rentConf}
                            devolution={this.devolution.bind(this)}
                          />
                        );
                      } else return null;
                    })}
                  </div>
                </div>
              );
            else return null;
          })
        )}
        <div className="paginator-container">
          {blocksPagination.map((block, iblock) => {
            let selected = "";
            if (iblock === indexPagination) selected = "selected";
            return (
              <div
                className={selected + " pag"}
                key={iblock}
                onClick={() => this.setIndexPagination(iblock)}
              >
                {iblock + 1}
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
