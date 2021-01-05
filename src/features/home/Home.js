import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styles from './Home.module.css';
import axios from 'axios';

const { loadState } = require('../../utils/LocalStorageHelpers');



export function Home() {
    const table = loadState('ticketState'); //<--- recieveDataFromDB().then(r => table = r)
    //sendStateToDB(table).then(r => table = r);
    const users = loadState('userState');
    console.log(users)
    return (
        <div>
            <h1 className={styles.row}>Current Work Orders</h1>
            <div className={styles.row}>
                <table>
                    <tbody>
                    {workOrders(table)}

                    </tbody>
                </table>

                <table>
                    <tbody>
                    {userRoster(users)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const userRoster = ledger => {
    const table = [];
    const temp = [];
    ledger.forEach(e => temp.push(JSON.parse(e)))
    temp.forEach(data => {

        if(data.payload.users !== undefined) {
            return (
                table.push(
                    <tr key={data.payload.id}>
                        <td>
                            {data.payload.name}
                        </td>
                        <td>
                            {data.payload.position}
                        </td>
                        <td>
                            {data.payload.securityLevel}
                        </td>
                    </tr>
                )

            )
        }
    })
    return table;
};

const workOrders = (ledger, flag) => {
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

