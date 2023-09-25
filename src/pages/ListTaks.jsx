import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ListTaks() {
    const buttons = [
        {
            name: "All",
            value: "all"
        },
        {
            name: "Active",
            value: ""
        },
        {
            name: "Completed",
            value: "on"
        },
    ];

    const [filtredTasks, setFiltredTasks] = useState(null);
    // const [id, setId] = useState(useParams().id);
    const [isSaving, setIsSaving] = useState(false);

    function filterTasks(filterType) {
        let filtredTasks1 = filtredTasks.filter(type => type.isCompleted === filterType);
        console.log("filtered task", filtredTasks1);
        return filtredTasks1;
    }

    useEffect(() => {
        setFiltredTasks(fetchTasksList())
    }, []);

    function handleFilter(e) {
        let filterType = e.target.value;
        console.log("type of filter", filterType)
        filterType !== "all"
            ? setFiltredTasks(filterTasks(filterType))
            : setFiltredTasks(fetchTasksList());
    }

    const fetchTasksList = () => {
        axios.get('http://localhost:3000/tasks')
            .then(function (response) {
                setFiltredTasks(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(function (response) {
                fetchTasksList()
            })
            .catch(function (error) {

            });
    }

    const handleclear = () => {
        const ids = filtredTasks.filter(input => input.isCompleted === 'on').map(input => input.id);
        axios.delete(`http://localhost:3000/tasks/${ids}`)
            .then((res) => {
                fetchTasksList()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleComplete = (id) => {
        const isCompleted = "on";
        console.log("------value", isCompleted);
        console.log("id", id)
        setIsSaving(true);
        axios.patch(`http://localhost:3000/tasks/${id}`, {
            isCompleted: isCompleted
        })
        .then(function (response) {
            console.log("updated---");
            setIsSaving(false);
        })
        .catch(function (error) {
           console.log("Error--------",error)
            setIsSaving(false)
        });
        
    }
    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Todo Application</h2>
            <div className="card">
                <div className="card-header">
                    <Link
                        className="btn btn-outline-primary"
                        to="/create">Create New Task
                    </Link>
                    {buttons &&
                        buttons.map((type, index) => (
                            <>
                                <button type="button" class="btn btn-outline-secondary"
                                    key={index} value={type.value}
                                    onClick={handleFilter}
                                >
                                    {type.name}
                                </button>
                            </>
                        ))}
                    <button
                        onClick={() => handleclear()}
                        className="btn btn-outline-danger mx-1">
                        Clear
                    </button>
                </div>
                <div className="card-body">

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>IsCompleted</th>
                                <th width="240px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtredTasks && filtredTasks.map((task, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{task.task}</td>
                                        {/* <td>{task.isCompleted}</td> */}
                                        <td>
                                            <input type="checkbox" defaultChecked={task.isCompleted} id="isCompleted" name="isCompleted" value={task.isCompleted} onClick={() => handleComplete(task.id)} />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(task.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListTaks