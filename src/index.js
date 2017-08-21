import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Container from './container.js';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router} from "react-router-dom";


ReactDOM.render(
<Router>
    <Container />
</Router>, document.getElementById('root'));
registerServiceWorker();
