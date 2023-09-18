import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import {UploadPage} from './UploadPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <NavBar />
  <Switch>
    <Route path="/" exact component={() => <App/>} />
    <Route path="/upload" component={UploadPage} />
  </Switch>

</Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
