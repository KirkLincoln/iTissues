import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setName,
    setDeadline,
    setTitle,
    setNote,
    selectIssue,
} from './issueSlice';
import { setIssue } from '../Master/masterSlice';
import { useStore } from 'react-redux';
import moment from 'moment';
import 'react-dates/initialize';
import {  SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import styles from './Issue.module.css';
import { Home } from '../home/Home';
import { Redirect } from 'react-router-dom';
import {createStore} from "@reduxjs/toolkit";



export function Issue() {
    const issue = useSelector(selectIssue);
    const dispatch = useDispatch();
    const date = moment();
    const [chosenDate, setChosenDate] = useState(date);
    const [focusedInput, setFocusedInput] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const axios = require('axios');

    // const sendDate = async date => {
    //     const tempDate = date.format('MM-DD-YYYY')
    //     await dispatch(setDeadline(tempDate))
    // }

    // sendDate(date).then(r => r);



    return (
        <div>
            <h1 className={styles.row}>Generate Ticket</h1>
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
                    Issue Title:
                    <input
                        type="text"
                        onChange={event => {event.persist(); dispatch(setTitle(event.target.value))}}
                        placeholder="Broken Screen - Laptop"
                    >
                    </input>
                </label>
                <label>
                    Additional Notes:
                    <textarea
                        onChange={event => {event.persist(); dispatch(setNote(event.target.value))}}
                        placeholder="Equipment request, rescheduling, etc."
                    >
                    </textarea>
                </label>
                <label>
                    Due Date:
                    <div>
                        <SingleDatePicker
                            date={chosenDate} // momentPropTypes.momentObj or null
                            onDateChange={
                                date => {
                                    dispatch(setDeadline(moment(date).format('MMMM d, YYYY')));
                                    setChosenDate(date);
                                }
                            } // PropTypes.func.isRequired
                            focused={focusedInput} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocusedInput(focused)} // PropTypes.func.isRequired
                        />
                    </div>
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
