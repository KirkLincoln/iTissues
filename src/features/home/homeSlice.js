import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
    name: 'issue',
    initialState: {
        tname: "",
        deadline: "",
        title: "",
        note: "",
        issues: [],
    },
    reducers: {
        setName: (state, action) => {
            state.tname = action.payload;
        },
        setDeadline: (state, action) => {
            state.deadline = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
        setIssues: (state, action) => {
            state.issues = action.payload;
        },
    },
});

export const { setName, setDeadline, setTitle, setNote, setIssue } = homeSlice.actions;


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

export default homeSlice.reducer;
