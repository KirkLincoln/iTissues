import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setName,
    setPosition,
    setSecurityLevel,
    selectIssue,
} from './userSlice';
import { submitEmployee } from '../home/homeSlice';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styles from './User.module.css';
import { Redirect } from 'react-router-dom';
import axios from "axios";

const { loadState } = require('../../utils/LocalStorageHelpers');

export function Users() {
    const employee = useSelector(submitEmployee);
    const dispatch = useDispatch();
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
                    <select
                        onChange={event => {event.persist(); dispatch(setSecurityLevel(event.target.value))}}
                    >
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                    </select>
                </label>

                <button
                    className={styles.button}
                    onClick={
                        async () => {
                            await dispatch(submitEmployee(employee));
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

export function UsersTable() {
    const table = loadState('userState'); //<--- recieveDataFromDB().then(r => table = r)
    //sendStateToDB(table).then(r => table = r);

    console.log(table);
    return (
        <div>
            <h1 className={styles.row}>Current Work Orders</h1>
            <div className={styles.row}>
                <table>
                    <tbody>
                    {usersRoster(table)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const usersRoster = ledger => {
    console.log(ledger);
    const table = [];
    const temp = [];
    ledger.forEach(e => temp.push(JSON.parse(e)))
    temp.forEach(payload => {
        return (
            table.push(
                <tr key={payload.id}>
                    <td>
                        {payload.tname}
                    </td>
                    <td>
                        {payload.title}
                    </td>
                    <td>
                        {payload.note}
                    </td>
                    <td>
                        {payload.deadline}
                    </td>
                </tr>
            )
        )
    })
    return table;
};

