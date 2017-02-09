import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index'
import Root from './root.jsx';
import rootSaga from './sagas';
import wsSaga from './wsSaga';
import './style.scss';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
// because of http://zalmoxisus.github.io/redux-devtools-extension/..
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(
			sagaMiddleware,
		),
	),
);
sagaMiddleware.run(function* (){
	yield [
		rootSaga(),
		// wsSaga(),
	]
});

ReactDOM.render(
	(<Provider store={store}>
		<Root />
	</Provider>),
	document.getElementById("app")
	)
