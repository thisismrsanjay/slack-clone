import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import * as serviceWorker from './serviceWorker';


import Login from './components/Auth/Login';
import Register from './components/Auth/Register';


import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

const Root =()=>(
    <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
        </Switch>
    </Router>
);


ReactDOM.render(<Root />, document.getElementById('root'));


serviceWorker.unregister();
