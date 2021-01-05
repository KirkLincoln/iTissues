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

export const { setName, setPosition, setSecurityLevel } = userSlice.actions;

export const selectIssue = state => state.issue;

export default userSlice.reducer;
