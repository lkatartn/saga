import { combineReducers } from 'redux';

import users from './users';
import userData from './userData';

export default combineReducers({
	userData,
	users,
})

