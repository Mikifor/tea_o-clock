import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import TimerOne from './timerOne/App'               //UI первого таймера
import storeOne from "./timerOne/State/state"       //BLL первого таймера
import TimerTwo from './timerTwo/App'               //UI второго таймера
import storeTwo from "./timerTwo/State/state"       //BLL второго таймера
import TimerThree from './timerThree/App'           //UI третьего таймера
import storeThree from "./timerThree/State/state"   //BLL третьего таймера





const root = ReactDOM.createRoot(document.getElementById('root'))

const rerenderDOM = () => {root.render(
  <React.StrictMode>
    <TimerThree /*<-UI таймера */ store={storeThree} /*<-BLL таймера */ />                    
  </React.StrictMode>
)
};

rerenderDOM();

storeThree.observer(rerenderDOM); /*<-BLL таймера */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
