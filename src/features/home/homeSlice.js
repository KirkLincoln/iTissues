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

const saveState = async (state, token) => {
    try {
        const serializedState = JSON.stringify(state);
        await localStorage.setItem(token + uuid(), serializedState);
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
                saveState(action.payload, 'ticketState').then(
                    res => {
                        return res;
                    });

        },
        submitEmployee: (state, action) => {
                saveState(action.payload, 'emplState').then(
                    res => {
                        return res;
                    }
                )
        }
    },
});

export const { setIssue } = homeSlice.actions;

export const selectIssue = state => state.issue;

export default homeSlice.reducer;
