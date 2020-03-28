import { createStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "SENDLOGINDATA":
      return {
        ...state,
        isLogin: action.data.isLogin,
        isAdmin: action.data.isAdmin
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  {
    host: "http://carloscruz85.com/movies/",
    isLogin: false,
    isAdmin: false,
    currentUser: {}
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
