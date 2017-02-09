import { connect } from 'react-redux';
import actions from './actions';
import {
	Table,
	UserData,
} from './components.jsx';

export const TableConnected = connect(
	(state) => ({
		users: state.users.data,
		selected: state.users.selectedUser,
	}),
	(dispatch) => ({
		onClickUser: (user) => dispatch({ type: actions.USER_SELECTED, payload: user }),
	})
	)(Table);

export const UserDataConnected = connect(
	(state) => ({
		loading: state.userData.loading,
		userName: state.userData.data.fullName,
		age: state.userData.data.age,
	})
)(UserData)
