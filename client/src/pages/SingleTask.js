import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from '../axios.js'

const SingleTask = () => {
  const styles = {
    modalBG: 'w-screen h-screen bg-modalBg flex justify-center items-center',
    modal: 'w-4/12 h-4/12 bg-white rounded-xl shadow-custom flex flex-col p-6',
    cancelBtnCov: 'flex justify-end',
    cancelBtn: 'bg-transparent border-0 text-2xl pointer-cursor',
    inputCover: 'flex flex-col justify-center items-center',
    title: 'inline-block text-center mt-3 text-3xl',
    inputBox: 'p-2 rounded-lg m-3 bg-zinc-100 w-8/12 outline-0',
    checkCover: 'flex items-center gap-x-2',
    options: 'flex justify-center items-center mt-5',
    delete: 'bg-gray-300 hover:bg-gray-400 text-rose-500 font-bold py-2 px-4 rounded-l',
    update: 'bg-gray-300 hover:bg-gray-400 text-emerald-600 font-bold py-2 px-4 rounded-r',
    // disabledUpdate: 'bg-gray-300 hover:bg-gray-400 text-emerald-600 font-bold py-2 px-4 rounded-r cursor-not-allowed pointer-events-none',
  }
  const navigator = useNavigate()
  const { pathname } = useLocation()
  const [ task, setTask ] = useState('')
  const [ completed, setCompleted ] = useState()
  const [ errorMsg, setErrorMsg ] = useState('')
  
  // let releaseBtn; // 1/3
  useEffect(() => {
    const fetchTask = () => {
      axios.get(`/api_v1/tasks/sync/${pathname.split('/')[4]}`)
      .then((res) => {
        setTask(res.data.task)
        // releaseBtn = res.data.task // 2/3
        /* console.log(res.data.task) */
        setCompleted(res.data.completed)
        /* console.log(res.data.completed) */
      })
      .catch((err) => {
        setErrorMsg(err.response.data)
      })
    }
    fetchTask()
  }, [pathname])
  const handleUpdate = () => {
    axios.patch(`/api_v1/tasks/update/${pathname.split('/')[4]}`, {task,completed})
    .then(() => {
      // navigator('/')
      window.location.replace('http://localhost:3000/')
    })
    .catch((err) => {
      setErrorMsg(err.response.data)
    })
  }
  const handleDelete = () => {
    axios.delete(`/api_v1/tasks/del/${pathname.split('/')[4]}`)
    .then(() => {
      navigator('/')
    })
    .catch((err) => {
      setErrorMsg(err.response.data)
    })
  }
  /* if (releaseBtn !== task) {  // 3/3
    styles.disabledUpdate = styles.update
  }
  console.log(releaseBtn)
  console.log(task) */
  return (
    <div className={styles.modalBG}>
      <div className={styles.modal}>
        {/* X */}
        <div className={styles.cancelBtnCov}>
          <button onClick={()=>{navigator('/')}} className={styles.cancelBtn}>X</button>
        </div>
        {/* Pass */}
        <div className={styles.inputCover}>
          <h1 className={styles.title}>Modify Task</h1>
          <input 
            type= 'text'
            placeholder='modify your task...'
            className={styles.inputBox}
            // required
            value = {task}
            onChange = {(e)=>{setTask(e.target.value)}}/>
          <div className={styles.checkCover}>
            <label>Completed: </label>
            <input
              type='checkbox'
              value= {completed}
              onChange= {(e) => {setCompleted(e.target.checked)}}
              />
            </div>
        </div>
        {/* errorMsg appears */}
        {errorMsg && (
          <p className='text-rose-600 m-auto'>{errorMsg} 😿</p>
        )}
        {/* Update n Delete */}
        <div className={styles.options}>
          <button onClick={handleUpdate} className={styles.update}>Update</button>
          <button onClick={handleDelete} className={styles.delete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default SingleTask