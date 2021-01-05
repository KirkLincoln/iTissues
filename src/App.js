import React from 'react';
import { Home } from './features/home/Home';
import { Issue } from './features/issue/Issue';
import { Users } from "./features/users/Users";
import { Route, Switch, Link} from 'react-router-dom';


import './App.css';
import axios from "axios";


function App() {
  return (
    <div className="App">
        <NavBar />
      <header className="App-header">
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/work-order" component={Issue}/>
                  <Route path="/users" component={Users}/>
              </Switch>
      </header>
    </div>
  );
}

const NavBar = () => {
    return (
        <div>
            <nav className="Navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/work-order">Work Orders</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const loadState = token => {
    try {
        let ledger = [];
        for (let i = 0; i < localStorage.length; i++) {
            let serializedStateKey = localStorage.key(i);
            if(!serializedStateKey.search(token)) {
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

export default App;
