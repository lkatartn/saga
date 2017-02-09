import actions from '../actions';

const initState = {
	data: {},
	loading: false,
	error: null,
}

export default function(state = initState, action) {
	switch (action.type) {
		case actions.USER_INFO_ING:
			return {
				...initState,
				loading: true,
			}
		case actions.USER_INFO_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
			}
		case actions.USER_INFO_FAIL:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		default:
			return state;
	}
}
