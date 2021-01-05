import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setIssue
} from './masterSlice';
import moment from "moment";
import styles from "./Issue.module.css";
import SingleDatePicker from "react-dates/esm/components/SingleDatePicker";

export function Master() {
    const dispatch = useDispatch();
    const [chosenDate, setChosenDate] = useState(moment());
    const [focusedInput, setFocusedInput] = useState(null);
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
                    Assigned Date:
                    <div>
                        <SingleDatePicker
                            date={chosenDate} // momentPropTypes.momentObj or null
                            onDateChange={date => { setDeadline(date); setChosenDate(date)}} // PropTypes.func.isRequired
                            focused={focusedInput} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocusedInput(focused)} // PropTypes.func.isRequired
                        />
                    </div>
                </label>
                <button
                    className={styles.button}
                    onClick={issue => setIssue(issue)}
                >Submit</button>
            </div>
            <div>
            </div>
        </div>
    );
}
