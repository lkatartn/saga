import { connect } from 'react-redux';
import actions from './actions';
import {
	Table,
} from './components';

export const TableConnected = connect(
	(state) => ({
		users: state.users.data,
	}),
	(dispatch) => ({
		onClick: (user) => dispatch({ type: actions.USER_SELECTED, payload: user }),
	})
	)(Table);


