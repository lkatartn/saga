import { takeLatest, takeEvery } from 'redux-saga';
import { put, select, call, take, race } from 'redux-saga/effects';
import api from './services';
import actions from './actions';
const WS_HOST = 'ws://localhost:2322'

// function* init() {
// 	yield put({ type: actions.USERS_FETCH_ING });
// 	yield put({ type: actions.WS_OPEN_PENDING, payload: WS_HOST})
// }

function* getUsers(action) {
	try {
		const users = yield call(api.getUsers);
		yield put({ type: actions.USERS_FETCH_SUCCESS, payload: users.data})
	} catch (error) {
		yield put({ type: actions.USERS_FETCH_FAIL, error})
	}
}

function* selectUser(action) {
	yield put({ type: actions.USER_INFO_ING, payload: action.payload.id })
}

function* getUserInfo(action) {
	try {		
		const userInfo = yield call(api.getUserById, action.payload);
		yield put({ type: actions.USER_INFO_SUCCESS, payload: userInfo.data })
	} catch (error) {
		yield put({ type: actions.USER_INFO_FAIL, error})
	}
}

// function* getInfoCancellable(action) {
// 	const { cancel, fetch } = yield race({
// 		fetch: getUserInfo(action),
// 		cancel: take(actions.CANCEL_INFO_FETCH),
// 	})
// }

export default function* () {
	yield [
		takeEvery(actions.USERS_FETCH_ING, getUsers),
		takeEvery(actions.USER_INFO_ING, getUserInfo),
		takeEvery(actions.USER_SELECTED, selectUser),
		// takeEvery(actions.USER_INFO_ING, getInfoCancellable),
		// takeLatest(actions.INIT, init),
	]
}