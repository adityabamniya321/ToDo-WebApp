import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header'
import Tasks from './components/Tasks';
import Addtask from './components/Addtask';
import Footer from './components/Footer';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data);
    return data
  }

  //add Task
  const addTask = async (task) => {

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])


    // const id = Math.floor(Math.random()*10000)+1
    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
    // console.log(tasks)
  }

  // show form, commmented because i am changing the state inline at the header componnet itself
  // const showForm = ()=> {
  //   console.log("ello there mate")
  //   setShowAddTask(!showAddTask)
  // }

  //delete task
  const deleteTask = async (id) => {
    // console.log('delete', id)
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const setRem = async (id) => {
    const taskToSet = await fetchTask(id)
    const updTask = {
      ...taskToSet,
      reminder: !taskToSet.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    }
    )
    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id) ? { ...task, reminder: data.reminder } : task))
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    console.log(data);
    return data
  }

  return (
    <Router>
      
        <div className="container">
          <Header title={"Task Tracker"} showForm={(e) => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
          {showAddTask && <Addtask onAdd={addTask} />}
          {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} setRem={setRem} />) : 'No tasks to show'}
        </div>
    </Router>
  );
}
export default App;


// class App extends React.Component{
//   render(){
//     return <h1>hello there mate</h1>
//   }
// }
// export default App

// <Routes>
//           <Route path='/about' element={<About />} />
// </Routes>
// <Footer />