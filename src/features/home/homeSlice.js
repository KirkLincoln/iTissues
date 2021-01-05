import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../../utils/LocalStorageHelpers';
const { uuid } = require('uuidv4');

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
                saveState(action.payload, 'userState').then(
                    res => {
                        return res;
                    }
                )
        }
    },
});

export const { setIssue, submitEmployee } = homeSlice.actions;

export const selectIssue = state => state.issue;

export default homeSlice.reducer;
