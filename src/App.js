import React from 'react';
import logo from './logo.svg';
import { Issue } from './features/issue/Issue';
// import { Counter } from './features/counter/Counter'
import './App.css';
import { Home } from './features/home/Home';
import { createBrowserHistory } from 'history';
import { Route, Switch, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <NavBar />
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/work-order" component={Issue}/>
              </Switch>
      </header>
    </div>
  );
}

const NavBar = () => {
    return (
        <div>
            <nav>
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
