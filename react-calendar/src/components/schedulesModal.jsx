import Modal from "react-modal"

export const ScheduleModal = () => {
  const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const getScheduleData = async () => {
      try{
        const res = await axios.get('http://192.168.0.10:8001/schedule')

        setSchedules(await res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getScheduleData()
  }, [] )

}