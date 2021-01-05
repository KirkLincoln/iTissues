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

const sendStateToDB = async state => {
    await axios({
        method: 'post',
        url: 'http://localhost:5000/api/world',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        },
        data: {
            state
        }
    })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

const recieveDataFromDB = async () => {
    await axios.get('http://localhost:5000/api/hello')
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error(error);
            return undefined;
        });
};

export function Home() {
    const table = loadState(); //<--- recieveDataFromDB().then(r => table = r)
    //sendStateToDB(table).then(r => table = r);

    console.log(table);
    return (
        <div>
            <h1 className={styles.row}>Current Work Orders</h1>
            <div className={styles.row}>
                <table>
                    <tbody>
                    {workOrders(table)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const workOrders = ledger => {
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

