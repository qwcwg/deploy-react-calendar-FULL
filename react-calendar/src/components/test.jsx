import React, { useEffect, useState } from 'react'
import { LinkButtons } from './linkButtons'
import axios from 'axios'



const Test = () => {
  const [axiosData, setAxiosData] = useState([])

  useEffect( () => {
    const getDate = async () => {
      try {
        const res = await axios.get("http://localhost:6000/test")
        setAxiosData(res.data)
      } catch (err) {
        console.log(err)
      }
      getDate()
    }    
  }, [])



  return (
    <div>
      <LinkButtons/>
      <h1>REST test</h1>
    </div>
  )
}

export default Test;


