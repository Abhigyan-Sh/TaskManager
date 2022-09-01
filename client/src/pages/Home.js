import axios from '../axios.js'
import React, { useEffect, useState } from 'react'
import Task from '../component/Task.js'
import Pusher from 'pusher-js'

const Home = () => {
  const styles = {
    homePgCover: 'bg-zinc-100 h-screen w-screen',
    taskMng: 'w-5/12 h-full m-auto pt-24 someSize1:w-6/12 someSize2:w-9/12 someSize3:w-10/12',
    createTasks: 'h-44 p-8 mb-24 shadow-2xl bg-white someSize5:p-5',
    peekTasks: 'w-full flex flex-col',
    heading: 'text-center text-3xl mb-7 font-custom3 text-rose-300 cursor-default',
    inputBox: 'flex items-center w-10/12 m-auto someSize5:w-full',
    input: 'basis-3/4 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full someSize6:text-xs',
    dropBelow: 'basis-1/4 h-full p-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded-r-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 someSize3:text-sm someSize6:text-xs',
    errorMessage: 'text-center text-rose-500',
  }
  const [ tasks, setTasks ] = useState([])
  const [ errMsg, setErrMsg ] = useState('')
  const [ inputTask, setInputTask ] = useState('')
  
  useEffect(() => {
    const pusher = new Pusher('fc7981c2be6da43edff6', {
      cluster: 'ap2'
    });
    
    const channel = pusher.subscribe('my-task');
    channel.bind('inserted', function(newTasks) {
      setTasks([...tasks, newTasks])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
}, [tasks])

  useEffect(() => {
    const fetchTasks = () => {
      axios.get('/api_v1/tasks/sync')
      .then((res) => {
        setTasks(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        setErrMsg(err.response.data)
        console.log(err)
      })
    }
    fetchTasks()
  }, [])
  const handleDropBelow =  () => {
    axios.post('/api_v1/tasks/new', {
      task: inputTask
    })
    .then(() => {
      return
    })
    .catch((err) => {
      setErrMsg(err.response.data)
      console.log(err)
    })
  }
  return (
    <div className= {styles.homePgCover}>
      <div className= {styles.taskMng}>
        <div className= {styles.createTasks}>
          <h1 className= {styles.heading}>Task Manager</h1>
          <div className={styles.inputBox}>
            <input
              type='text'
              placeholder='e.g. wash clothes'
              className={styles.input}
              // required
              value= {inputTask}
              onChange= {e => setInputTask(e.target.value)}
              />
            <button className={styles.dropBelow} onClick={handleDropBelow}>dropDown</button>
          </div>
          {errMsg && (
            <p className={styles.errorMessage}>{errMsg}</p>
          )}
        </div>
        <div className= {styles.peekTasks}>
          {tasks.map((e, i) => (
            <Task key={i} task= {e}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home