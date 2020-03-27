import {createStore} from 'redux';
const reducer = (state, action) => {
	switch(action.type){
	case "LOGIN":
		return{
		...state,
		user: action.data,
		login: true
	}
	default :
		return state
	}
}

export default createStore(reducer, {
	host: 'http://carloscruz85.com/movies/'
})