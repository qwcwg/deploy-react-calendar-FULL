import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IP_ADDRESS } from '../App'


export const DeleteSchedule = (props) => {

  const handleDelete = async (id) => {
    try {
      await axios.put(`http://${IP_ADDRESS}:8001/schedule/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={() => {handleDelete(props.id)}}>delete</button>
    </div>
  )
}