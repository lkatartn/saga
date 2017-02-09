import { takeLatest, takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';
import api from './services';
import actions from './actions';

function* getUsers(action) {
	try {
		const users = yield call(api.getUsers);
		yield put({ type: actions.USERS_FETCH_SUCCESS, payload: users.data})
	} catch (error) {
		yield put({ type: actions.USERS_FETCH_FAIL, error})
	}
}



export default function* () {
	yield [
		takeEvery(actions.USERS_FETCH_ING, getUsers)
	]
}