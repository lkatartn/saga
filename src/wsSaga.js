import { takeLatest, takeEvery, eventChannel } from 'redux-saga';
import { call, put, spawn, take, cancel, fork } from 'redux-saga/effects';
import actions from './actions';
import api from './services';

const { ws: wsApi } = api;
const {
  WS_OPEN_PENDING,
  WS_OPEN_SUCCESS,
  WS_OPEN_FAIL,
  WS_CLOSING,
  WS_CLOSED,
  WS_MSG_RECEIVED,
  WS_MSG_SEND,
} = actions;

function createSender(ws) {
  return function* sendMsg(action) {
    yield call(wsApi.send, ws, action.payload);
  };
}

function createListener(chan) {
  return function* listen() {
    while (true) {
      const msg = yield take(chan);
      yield put(msg);
    }
  };
}

function* waitForClose(ws, senderTask, listener) {
  yield take([WS_CLOSING, WS_CLOSED]);
  yield cancel(senderTask);
  yield cancel(listener);
}

const createSocketEmitter = ws => (emit) => {
  wsApi.onReceive(ws, msg =>
    emit({ type: WS_MSG_RECEIVED, payload: msg.data }));
  wsApi.onClose(ws, reason =>
    emit({ type: WS_CLOSED, payload: reason }));
  return () => wsApi.close(ws);
};

function* openConn(action) {
  try {
    // init ws
    const ws = yield call(wsApi.open, action.payload);
    yield put({ type: WS_OPEN_SUCCESS });
    // create a channel to get msgs from ws conn
    const chan = eventChannel(createSocketEmitter(ws));
    // sender has a task interface
    const sender = yield takeEvery(WS_MSG_SEND, createSender(ws));
    // listener is a task too
    const listener = yield fork(createListener(chan));
    // we do not want to know what will happen
    yield spawn(waitForClose, ws, sender, listener);
  } catch (error) {
    yield put({ type: WS_OPEN_FAIL, error });
  }
}

export default function () {
  return [
    takeLatest(WS_OPEN_PENDING, openConn),
  ];
}
