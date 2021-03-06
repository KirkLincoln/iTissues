import { configureStore } from '@reduxjs/toolkit';
import masterReducer from '../features/home/homeSlice';
import issueReducer from '../features/issue/issueSlice';
import userReducer from '../features/users/userSlice';

export default configureStore({
  reducer: {
    master: masterReducer,
    issue: issueReducer,
    users: userReducer
  },
},    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
