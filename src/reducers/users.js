import actions from '../actions';

const initState = {
	data: [],
	loading: false,
	error: null,
	selectedUser: {},
}

export default function(state = initState, action) {
	switch (action.type) {
		case actions.USERS_FETCH_ING:
			return {
				...initState,
				loading: true,
			}
		case actions.USERS_FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			}
		case actions.USERS_FETCH_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		case actions.USER_SELECTED:
			return {
				...state,
				selectedUser: action.payload,
			}
		default:
			return state;
	}
}
