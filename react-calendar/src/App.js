import './App.css';
import {useState, useEffect} from 'react'
import DayCell from './components/dayCell';
import AddSchedule from './components/addSchedule'
import { LinkButtons } from './components/linkButtons';
import { useDateState } from './components/state';
import { Weeks } from './components/weeks';
import { MonthChangeButton } from './components/monthChangeButtons';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TestModal } from './components/testModal';
import { UpdateScheduel } from './components/updateSchedule';

export const IP_ADDRESS = '192.168.0.10'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= '/' element= {<Calendar/>}/>
        <Route path= '/test' element= {<AddSchedule/>}/>
        <Route path= '/testModal' element= {<TestModal/>}/>
        <Route path= '/update/:id' element= {<UpdateScheduel/>}/>
      </Routes>
    </BrowserRouter>
 
    
  );
}




// import {useState, useEffect} from 'react'
// import { useDateState } from '../state'

const Calendar = () => {
  return(
    <div className='wrapper'>
      <LinkButtons/>
      <MonthChangeButton/>
      <div className='header'>
        <MonthNum/>
      </div>

      <div className='calendar'>
        <Weeks/>
        <div className='days'>
          <DayCell/>
        </div>
      </div>
    </div>
  )
}

const MonthNum = () => {  // to get Month Number
  const { monthNum, yearNum, increaseNum } = useDateState()
  return( 
    <div className='month-num'>
      {`${yearNum}년`}   {`${monthNum}월` }
    </div>
  )
}




export default App;