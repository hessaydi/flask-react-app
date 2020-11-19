import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import 'semantic-ui-css/semantic.min.css'
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

import App from './App';
// import { watchAgeUp } from "./sagas/saga";
import reducer from "./store/reducer";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// sagaMiddleware.run(watchAgeUp);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        ,document.getElementById("root"));
