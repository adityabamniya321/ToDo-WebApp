import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, setRem }) => {
    return (
        <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={()=> setRem(task.id) }>
            <h3>
                {task.text}
                <FaTimes
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={()=>onDelete(task.id)}
                />
            </h3>
            <p>{task.day}</p>
            <p>{task.reminder}</p>
        </div>
    )
}

export default Task