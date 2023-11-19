import React, { useEffect, useState } from 'react'
import { LinkButtons } from './linkButtons'
import axios from 'axios'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

export const UpdateScheduel = () => { 

  const location = useLocation()
  const navigate = useNavigate()

  const scheduleID = location.pathname.split("/")[2];


  const [scheduleData, setScheduleData] = useState({
    writer_id: 1,
    schedule_date: '',
    content: '',
    title: ''
  })

  // useEffect(() => {
  //   const getScheduleData = async () => {
  //     try{
  //       const res = await axios.get(`http://localhost:8001/schedule/${scheduleID}`)
  //       setScheduleData(await res.data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getScheduleData()
  // }, [] )

  const handleChange = (event) => {
    setScheduleData((prev) => ({...prev, [event.target.name]: event.target.value}))
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      await axios.put(`http://localhost:8001/schedule/${scheduleID}`, scheduleData)
      alert(`수정 완료!`)
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  console.log(scheduleID)
  console.log(scheduleData)



  return (
    <div className='add-class-container'>
      <LinkButtons/>
      <form>
        <h4>title</h4>
        <input type='text' placeholder='title' name='title' onChange={handleChange}/> 
        <br/>
        <h4>content</h4>
        <textarea placeholder='content' name='content' onChange={handleChange} cols='25' rows='4'/>
        <br/>
        <h4>schedule_date</h4>
        <input type='date' placeholder='schedule Date' name='schedule_date' onChange={handleChange} /> 
        <br/>

        <button type='submit' onClick={handleUpdate}>제출</button>
      </form>
      <Link to="/"><button>go to calendar</button></Link>
    </div>
  )
}