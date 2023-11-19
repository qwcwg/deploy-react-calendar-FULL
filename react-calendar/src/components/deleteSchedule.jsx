import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dotenv from "dotenv";

dotenv.config()


export const DeleteSchedule = (props) => {

  const handleDelete = async (id) => {
    try {
      await axios.put(`${process.env.SCHEDULE_API}schedule/${id}`)
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