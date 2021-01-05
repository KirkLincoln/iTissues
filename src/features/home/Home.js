import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styles from './Home.module.css';
import axios from 'axios';


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
    }

;

