import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function CreateTask() {
  const [task, setTask] = useState('');
  //const [isCompleted, SetIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate()

  const handleSave = () => {
    setIsSaving(true);
    axios.post('http://localhost:3000/tasks', {
      task: task
      //isCompleted: isCompleted
    })
      .then(function (response) {
        setIsSaving(false);
        setTask('')
        //SetIsCompleted('')
      })
      .catch(function (error) {
        setIsSaving(false)
      });
    navigate("/")
  }
  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-3">Create New Task</h2>
      <div className="card">
        <div className="card-header">
          <Link
            className="btn btn-outline-info float-right"
            to="/">View All Tasks
          </Link>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="name">Task</label>
              <input
                onChange={(event) => { setTask(event.target.value) }}

                type="text"
                className="form-control"
                id="task"
                name="task" />
            </div>
            {/* <div className="form-group">
              <label htmlFor="isCompleted">Is Completed</label>
               <input type="checkbox" 
                onChange={(event) => { SetIsCompleted(event.target.value) }}
                className="form-control"
                id="isCompleted"
                rows="3"
                name="isCompleted"
              /> 
              <textarea
                onChange={(event) => { SetIsCompleted(event.target.value) }}
                className="form-control"
                id="isCompleted"
                rows="3"
                name="isCompleted">
              </textarea>
            </div> */}
            <button
              disabled={isSaving}
              onClick={handleSave}
              type="button"
              className="btn btn-outline-primary mt-3">
              Save Task
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTask