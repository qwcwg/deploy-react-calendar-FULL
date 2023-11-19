import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const DeleteSchedule = (props) => {

  const handleDelete = async (id) => {
    try {
      await axios.put(`localhost:8001/schedule/${id}`)
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