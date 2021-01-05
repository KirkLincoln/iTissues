import { createSlice } from '@reduxjs/toolkit';
const { uuid } = require('uuidv4');

const loadState = () => {
    try {
        let ledger = [];
        for (let i = 0; i < localStorage.length; i++) {
            let serializedStateKey = localStorage.key(i);
            if(!serializedStateKey.search('ticketState')) {
                ledger.push(localStorage.getItem(serializedStateKey))
            }
        }
        const serializedState = "";
        if (serializedState === null) {
            return undefined;
        }
        console.log(ledger);
        return ledger;
        //return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await localStorage.setItem('ticketState' + uuid(), serializedState);
    } catch {

    }
};

export const homeSlice = createSlice({
    name: 'master',
    initialState: {
        issues: loadState(),
    },
    reducers: {
        setIssue: (state, action) => {
                saveState(action.payload).then(
                    res => {
                        return res;
                    });

        }
    },
});

export const { setIssue } = homeSlice.actions;


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
