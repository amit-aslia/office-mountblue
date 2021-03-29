import authReducer from './authReducer';
import httpHistoryReducer from './httpHistoryReducer'
import renderHistoryDataRducer from './renderHistoryDataReducer'
import currentTabReducer from './currentTabReducer'
import tabHistoryReducer from './tabHistoryReducer'
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  newHttpData: httpHistoryReducer,
  firestore: firestoreReducer, //responsible to sync the data from database
  firebase: firebaseReducer,
  historyData: renderHistoryDataRducer,
  tabHistory:tabHistoryReducer,
  currentTabId:currentTabReducer
});

export default rootReducer;
