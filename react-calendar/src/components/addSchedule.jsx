import React, { useEffect, useState } from 'react'
import { LinkButtons } from './linkButtons'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'
import { IP_ADDRESS } from '../App'


const AddSchedule = () => { 

  const navigate = useNavigate()

  const [scheduleData, setScheduleData] = useState({
    writer_id: 1,
    schedule_date: '',
    content: '',
    title: ''
  })

  const handleChange = (event) => {
    setScheduleData((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(`http://${IP_ADDRESS}:8001/schedule`, scheduleData)
    } catch (error) {
      console.log(error)
    }
    alert(`입력 완료!`)
    console.log(scheduleData)
    navigate('/')
  }


  return (
    <div className='add-class-container'>
      <LinkButtons/>
      <form>
        <h4>title</h4>
        <input type='text' placeholder='title' name='title' onChange={handleChange} /> 
        <br/>
        <h4>content</h4>
        <textarea placeholder='content' name='content' onChange={handleChange} cols='25' rows='4'></textarea>
        <br/>
        <h4>schedule_date</h4>
        <input type='date' placeholder='schedule Date' name='schedule_date' onChange={handleChange}/> 
        <br/>

        <button className='btn' type='submit' onClick={handleSubmit}>제출</button>

      </form>
    </div>
  )
}

export default AddSchedule;


