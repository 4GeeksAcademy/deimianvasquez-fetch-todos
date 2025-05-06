import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";


const initialStateTask = {
    label: "",
    is_done: false
}

const urlBase = "https://playground.4geeks.com/todo"

const ToDoList = () => {
    const [task, setTask] = useState(initialStateTask)
    const [taskList, setTaskList] = useState([])


    const handleChange = (event) => {
        setTask({
            ...task,
            label: event.target.value
        })
    }


    /*
        traer todos los usuarios de un banco
        fetch("banco.com", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                "Authorization": "credenciales"
            }
        })
    
    
    */

    const saveTask = async (event) => {
        // if (event.key == "Enter") {
        //     setTaskList((prev) => [...prev, task])
        //     setTask(initialStateTask)
        // }


        if (event.key == "Enter") {
            try {
                // fetchin de datos
                const response = await fetch(`${urlBase}/todos/deimian`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                })

                if (response.ok) {
                    getAllTask()
                    setTask(initialStateTask)
                }

            } catch (error) {
                console.log(error)
            }
        }

    }

    // const deleteTask = (id) => {
    // 

    //     fetch(`${urlBase}/todos/${id}`, {
    //         method: "DELETE"
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 getAllTask()
    //             }
    //         })
    //         .catch((error) => console.log("paso algo"))
    // }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${urlBase}/todos/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                getAllTask()
            }
            if (response.status == 404) {
                console.log("El usuario no existe")
            }

        } catch (error) {
            console.log("Explote")
        }
    }



    // const createUser = async () => {
    //     try {
    //         // logica para crear user}
    //         const response = await fetch(`${urlBase}/users/deimian`, {
    //             method: "POST"
    //         })


    //     } catch (error) {
    //         
    //     }
    // }

    async function createUser() {
        try {
            const response = await fetch(`${urlBase}/users/deimian`, {
                method: "POST"
            })

            if (!response.ok) {
                console.log("generamos error")
            }


        } catch (error) {
            console.log(error)
        }
    }


    const getAllTask = async () => {
        try {
            const response = await fetch(`${urlBase}/users/deimian`) // es un get
            const data = await response.json()

            if (response.ok) {
                setTaskList(data.todos)
            }
            if (response.status == 404) {
                // hacer una funcion que crea el usuario
                console.log("crear el usuario")
                createUser()
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTask()
    }, [])


    return (
        <>
     
            <div className="container">
                <div className="row justify-content-center justify-content-center">
                    <div className="col-12 col-md-7 col-lg-6">
                        <h1 className="display-1 text-center" style={{ color: "#EBD8D9" }}>TODOS</h1>
                        <div className="border border-bottom-0">
                            <form
                                onSubmit={(event) => event.preventDefault()}
                            >
                                <input
                                    type="text"
                                    className=""
                                    name="label"
                                    placeholder="What needs to be done ?"
                                    value={task.label}
                                    onChange={handleChange}
                                    onKeyDown={saveTask}
                                />
                            </form>

                            <ul>
                                {
                                    taskList.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                "id: "{item.id} -- {item.label}
                                                <span

                                                >
                                                    <i onClick={() => deleteTask(item.id)}>x</i>
                                                </span>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                            <span className="all-task-info">
                                {
                                    `${taskList.length} item left`
                                }
                            </span>


                        </div>
                        <div className="decoration">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default ToDoList;