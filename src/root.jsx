import React from 'react';
import { connect } from 'react-redux';
import actions from './actions';
import {
	TableConnected,
	UserDataConnected,
} from './containers';

class Root extends React.Component {
	componentDidMount() {
		this.props.getUsers();
		// this.props.init();
	}
	render() {
		return (
		<div>
			<TableConnected />
			<UserDataConnected />
			{/*<button onClick={this.props.cancelRequest}>CANCEL</button>*/}
		</div>);
	}
};

export default connect(null,
	(dispatch) => ({
		getUsers: () => dispatch({ type: actions.USERS_FETCH_ING }),
		// init: () => dispatch({ type: actions.INIT }),
		// cancelRequest: () => dispatch({ type: actions.CANCEL_INFO_FETCH }),
	})
)(Root);
