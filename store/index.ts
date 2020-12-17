import { applyMiddleware, createStore, Middleware, StoreEnhancer } from 'redux';
import { createWrapper, MakeStore, HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { RootStateOrAny } from 'react-redux';

import { AppState } from '@/interfaces/store';
import rootReducer from './reducers';
import rootSaga from './sagas';

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state:any, action:any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    
    if (state.products.cartItems) nextState.products.cartItems = state.products.cartItems;
    
    return nextState
  } else {
    return rootReducer(state, action);
  }
}

export const makeStore: MakeStore<AppState> = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store: RootStateOrAny = createStore(reducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<AppState>(makeStore, { debug: true });