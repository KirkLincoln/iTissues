import { configureStore } from '@reduxjs/toolkit';
import masterReducer from '../features/master/masterSlice';
import issueReducer from '../features/issue/issueSlice';

export default configureStore({
  reducer: {
    master: masterReducer,
    issue: issueReducer,
  },
},    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
