import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setName,
    setPosition,
    setSecurityLevel,
    selectIssue,
} from './userSlice';
import { setIssue } from '../home/homeSlice';
import moment from 'moment';
import 'react-dates/initialize';
import {  SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import styles from './User.module.css';
import { Redirect } from 'react-router-dom';

export function Users() {
    const issue = useSelector(selectIssue);
    const dispatch = useDispatch();
    const date = moment();
    const [chosenDate, setChosenDate] = useState(date);
    const [focusedInput, setFocusedInput] = useState(null);
    const [redirect, setRedirect] = useState(false);

    return (
        <div>
            <h1 className={styles.row}>Add New Employee</h1>
            <div className={styles.row}>
                <label>
                    Technician Name:
                    <input
                        type="text"
                        onChange={event => {event.persist(); dispatch(setName(event.target.value))}}
                        placeholder="Billy Joe"
                    >

                    </input>
                </label>
                <label>
                    Position:
                    <input
                        type="text"
                        onChange={event => {event.persist(); dispatch(setPosition(event.target.value))}}
                        placeholder="Service Technician"
                    >
                    </input>
                </label>
                <label>
                    Security Level:
                    <select>
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                    </select>
                </label>

                <button
                    className={styles.button}
                    onClick={
                        async () => {
                            await dispatch(setIssue(issue));
                            setRedirect(true);
                        }
                    }
                >Submit</button>
            </div>
            { redirect ? <Redirect to="/" /> : null }
            <div>
            </div>
        </div>
    );
}
