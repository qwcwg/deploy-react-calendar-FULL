import { useState, useEffect } from 'react'
import { useDateState } from './state'
import Modal from 'react-modal'
import AddSchedule from './addSchedule'

export const TestModal = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const modalToggle = () => {
    setModalOpen(!modalOpen)
  }

  return (

    <div>
      <button onClick={() => {modalToggle()}}>modal open</button>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates sint unde delectus perspiciatis sequi, voluptatum esse nostrum odit minus sed sunt cupiditate earum? Porro consectetur ratione unde ipsum quaerat molestias recusandae voluptatem distinctio, sunt eligendi amet? Nisi expedita voluptatum quibusdam quia corporis cumque dolores culpa, molestiae assumenda, praesentium fuga eius.
      <Modal 
        isOpen={modalOpen}
        onRequestClose={() => {modalToggle()}}
      >
        <AddSchedule/>
      </Modal>
    </div>
  )
}