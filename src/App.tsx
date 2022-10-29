import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import "react-dates/lib/css/_datepicker.css"
import { InfoTable } from './components/info-table';
import moment from 'moment';
import { AppDatePicker } from './components/app-datepicker';
import { AppGraph } from './components/app-graph';

function App() {
  const [appDates, setAppDates] = React.useState({
    startDate: moment.utc("2021-08-20"),
    endDate: moment.utc("2021-08-26")
});

  return (
    <div className="App">
      <div className='app-datepicker'>
        <AppDatePicker appDates={appDates} setAppDates={setAppDates}/>
      </div>
      <div className='graph-container'>
        <AppGraph appDates={appDates}/>
      </div>
      <div className='table-container'>
        <InfoTable appDates={appDates}/>
      </div>
    </div>
  );
}

export default App;
