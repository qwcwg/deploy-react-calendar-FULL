import { useState, useEffect } from 'react'
import { useDateState } from './state'
import axios from 'axios'
import Modal from 'react-modal'
import AddSchedule from './addSchedule'
import { DeleteSchedule } from './deleteSchedule'
import { Link } from 'react-router-dom'
import { IP_ADDRESS } from '../App'



const DayCell = () => {   // to make DayList
  const [schedules, setSchedules] = useState([])
  const [daysList, setdaysList] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const { date, yearNum, monthNum, twoDigitMonth, twoDigitBeforeMonth, twoDigitAfterMonth, dayNum, todayDateNum, fullDateString } = useDateState()

  useEffect(() => {
    const getScheduleData = async () => {
      try{
        const res = await axios.get(`http://${IP_ADDRESS}:8001/schedule`)
        // console.log(res)
        setSchedules(await res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getScheduleData()
    // console.log(`schedules: ${schedules}`)
  }, [monthNum] )

  // day = day of week (ex. Mon, Thu ...)
  // date = date (ex. 1, 2, 10 ...)

  // const [daysList, setdaysList] = useState([])
  // const date = new Date()   // Currunt date
  // const yearNum = date.getFullYear() 
  // const monthNum = date.getMonth() + 1  // +1 for


  const firstDayofCurrMonth = new Date(yearNum, monthNum, 1).getDay();  // 
  const lastDateofCurrMonth = new Date(yearNum, monthNum, 0).getDate();
  const lastDayofCurrMonth = new Date(yearNum, monthNum, lastDateofCurrMonth).getDay();

  const lastDateofBeforeMonth = new Date(yearNum, monthNum - 1, 0).getDate();
  const lastDayofBeforeMonth = new Date(yearNum, monthNum - 1, 0).getDay();  // to make before CurrMonth days(ex. ...'29, 30, 31', 1...)

  const firstDayofAfterMonth = new Date(yearNum, monthNum, 1).getDay() // to make after CurrMonth days(ex. ...30, 31, '1, 2, 3'...)
  const firstDateofAfterMonth = new Date(yearNum, monthNum, 1).getDate()

  const getBeforeMonthDates = (lastDateofBeforeMonth, lastDayofBeforeMonth) => {  // get BeforeMonth dates
    let BeforeDates = new Array()
    if (lastDayofBeforeMonth != 6) {
      for (let i = lastDayofBeforeMonth; i >= 0; i--) {
        BeforeDates.unshift({ date: lastDateofBeforeMonth, type: "BeforeDate" })  // to get type of dates, retrun Object
        lastDateofBeforeMonth--
      }
    }
    return (BeforeDates)
  }

  const getCurrMonthDates = (lastDateofCurrMonth, monthNum, yearNum) => {
    let CurrentDates = new Array()
    for (let i = 1; i <= lastDateofCurrMonth; i++) {
      if (i === new Date().getDate() && monthNum === new Date().getMonth() + 1 && yearNum === new Date().getFullYear()) {  // if date == TODAY, add today property
        CurrentDates.push({ date: i, type: "CurrDate", today: "today" });  // to check TODAY
      } else {
        CurrentDates.push({ date: i, type: "CurrDate" })
      }
    }
    return (CurrentDates)
  }

  const getAfterMonthDates = (firstDateofAfterMonth, firstDayofAfterMonth) => {
    let AfterDates = new Array()
    for (let i = firstDayofAfterMonth; i <= 6; i++) {
      AfterDates.push({ date: firstDateofAfterMonth, type: "AfterDate" })
      firstDateofAfterMonth++
    }
    return (AfterDates)
  }

  const for42DateLength = () => {

  }

  const DatesCombine = (BeforeDates, CurrDates, AfterDates) => {
    const FullDates = BeforeDates.concat(CurrDates).concat(AfterDates)
    return (FullDates)
  }

  const dateDigitCheck = (dateObject) => {   // there will be an object on a date
    dateObject.date = dateObject.date.toString()  
    if (dateObject.date.length == 1) {
      dateObject.date = `0${dateObject.date}`
    }

    return dateObject
  }


  const BeforeDates = getBeforeMonthDates(lastDateofBeforeMonth, lastDayofBeforeMonth)
  const CurrentDates = getCurrMonthDates(lastDateofCurrMonth, monthNum, yearNum)
  const AfterDates = getAfterMonthDates(firstDateofAfterMonth, firstDayofAfterMonth)

  const FullDates = DatesCombine(BeforeDates, CurrentDates, AfterDates)

  const twoDigitFullDates = FullDates.map((date, i) => {
    return(dateDigitCheck(date))
  })
  // console.log(twoDigitFullDates)

  // console.log(FullDates)
  // console.log(twoDigitFullDates)


  // console.log("-----")  // for test
  // console.log(twoDigitBeforeDates)
  // console.log(schedules[2]?.schedule_date)

  // console.log(BeforeDates)
  // console.log(CurrentDates)
  // console.log(AfterDates)
  // console.log(FullDates)
  // console.log(monthNum)
  // console.log(increasedMonth)
  // console.log(lastDayofBeforeMonth)
  console.log(process.env.SCHEDULE_API)



  useEffect(() => { setdaysList(twoDigitFullDates) }, [monthNum])



  const modalToggle = () => {
    setModalOpen(!modalOpen)
  }

  const handleClick = () => {
    modalToggle()

  }

  const handleDelete = async (id) => {  // to delete schedule
    try {
      await axios.delete(`http://${IP_ADDRESS}:8001/schedule/${id}`)
      window.location.reload()
      modalToggle()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Modal isOpen={modalOpen} onRequestClose={() => {handleClick()}}>
        <Link to='/test'><button>add schedule</button></Link>
        <hr/>
        <hr/>
        {schedules.map((schedule, i) => {
          // console.log(schedule.id + '= ID')
          return (
          <div>
            <h4>{schedule.title}</h4>
            <div>{schedule.content}</div>
            <button onClick={() => {handleDelete(schedule.id)}}>delete</button>
            <Link to= {`/update/${schedule.id}`}><button>update</button></Link> 
            <hr/>
          </div>
          )
        })}
      </Modal>
      {daysList.map((day, i) => {


      if (day.type == 'BeforeDate') { // for id monthNum 
        return (

          <button className='day-button' onClick={() => handleClick()}>
            <div className='button-container'>
              <div className='date-text'> {day.date} </div>
              <div className={`dayCell ${day.type} ${day.today}`} id={`${yearNum}-${twoDigitBeforeMonth}-${day.date}`}> 
                {schedules.map((schedule, i) => {              
                  if (schedule.schedule_date == `${yearNum}-${twoDigitBeforeMonth}-${day.date}`) {
                    return(
                      <p className='overflow'> {schedule.title} </p>
                    )
                  }
                })}

              </div>
            </div>
          </button>
        )
      } else if (day.type == 'CurrDate'){
        return (
          <button className='day-button' onClick={() => handleClick()}>
          <div className='button-container'>
            <div className='date-text'> {day.date} </div>
            <div className={`dayCell ${day.type} ${day.today}`} id={`${yearNum}-${twoDigitMonth}-${day.date}`}>
              {schedules.map((schedule, i) => {              
                if (schedule.schedule_date == `${yearNum}-${twoDigitMonth}-${day.date}`) {
                  return(
                    <p className='overflow'> {schedule.title} </p>
                  )
                }
              })}

            </div>
          </div>
        </button>
        )

      } else if (day.type == 'AfterDate'){
        return (
          <button className='day-button' onClick={() => handleClick()}>
          <div className='button-container'>
            <div className='date-text'> {day.date} </div>
            <div className={`dayCell ${day.type} ${day.today}`} id={`${yearNum}-${twoDigitAfterMonth}-${day.date}`}>
              {schedules.map((schedule, i) => {              
                if (schedule.schedule_date == `${yearNum}-${twoDigitAfterMonth}-${day.date}`) {
                  return(
                    <p className='overflow'> {schedule.title} </p>
                  )
                }
              })}

            </div>
          </div>
        </button>
        )
      }


      })}

          </div>

        )
      }

export default DayCell



