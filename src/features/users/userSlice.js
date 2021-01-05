import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";
import { submitEmployee } from '../home/homeSlice'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        position: "",
        securityLevel: "",
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPosition: (state, action) => {
            state.position = action.payload;
        },
        setSecurityLevel: (state, action) => {
            state.securityLevel = action.payload;
        },
    },
});

export const { setName, setPosition, setSecurityLevel, submitEmployee } = userSlice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectIssue = state => state.issue;

export default userSlice.reducer;
