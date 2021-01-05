import React, { useState } from 'react';
import {useSelector, useDispatch, useStore, connect} from 'react-redux';
import {
    setName,
    setDeadline,
    setTitle,
    setNote,
    selectIssue,
} from './homeSlice';
import {masterSlice, setIssue} from '../Master/masterSlice';
import moment from 'moment';
import 'react-dates/initialize';
import {  SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import styles from './Home.module.css';
import axios from 'axios';
import {createBrowserHistory} from "history";
import store from '../../app/store';

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



export function Home() {
    const tickets = useStore();
    // tickets.then(
    //     result => {
    //         console.log(result);
    //         table.push(result);
    //     }
    // )
    tickets.subscribe(setIssue);
    console.log();

    const table = loadState();
    const sendStateToDB = async state => axios({
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
            console.log('here is the error on a post request from the python server of listname ', error);
        });
    sendStateToDB(table).then(r => console.log(r));
    const dispatch = useDispatch();
    const [chosenDate, setChosenDate] = useState(moment());
    const [focusedInput, setFocusedInput] = useState(null);
    const callApi = async () => {
        const response = await axios.get('http://localhost:5000/api/hello')
                .then((response) => {
                    console.log('this is the response from the api', response);
                })
                .catch((error) => {
                    console.log('here is the error on a post request from the python server of listname ', error);
                    return null;
                });
        return response;
    };

/*
headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
        }
 */

return (
        <div>
            <h1 className={styles.row}>Current Work Orders</h1>
            <div className={styles.row}>
                <table>
                    <tbody>
                    {workOrders(table)}
                    </tbody>
                    <button onClick={() => callApi()}> Submit </button>
                </table>
            </div>
        </div>
    );
}

const workOrders = ledger => {
    console.log(ledger);
    const table = [];
    const table1 = [];
    ledger.forEach(e => table1.push(JSON.parse(e)))

        table1.forEach(payload => {
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
    }

;

