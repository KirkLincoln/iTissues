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






export default App;
