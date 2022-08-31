import React from 'react'
import { Link } from 'react-router-dom'

const Task = (props) => {
  const styles = {
    taskCover: 'p-5 mb-2 shadow-xl bg-white hover:text-emerald-700 hover:-translate-y-0.5',
    taskText: 'text-lg capitalize font-custom1 font-semibold pl-10 tracking-wider',
    taskTextCompleted: 'text-lg capitalize font-custom1 font-semibold pl-10 tracking-wider line-through',
  }
  if (props.task.completed) {
    styles.taskText = styles.taskTextCompleted
  }
  return (
    <Link to={`/api_v1/tasks/sync/${props.task._id}`}>
      <div className= {styles.taskCover}>
        <p className={styles.taskText}>{props.task.task}</p>
      </div>
    </Link>
  )
}

export default Task