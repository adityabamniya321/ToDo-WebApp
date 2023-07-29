import Task from "./Task"


const Tasks = ({tasks, onDelete, setRem}) => {
    
    return (
    <div>
        {tasks.map((task)=>(
            <Task key={task.id} task={task} onDelete={onDelete} setRem = {setRem}/>
        ))}
    </div>
  )
}

export default Tasks