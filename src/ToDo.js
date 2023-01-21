import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"
import {Table, Input} from 'reactstrap'
 
const ToDo = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
 
    const addTodo = async (e) => {
        e.preventDefault();  
        try {
            const docRef = await addDoc(collection(db, "todos"), {
              todo: todo,    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          window.location.reload(false)
    }

    const handleClick = async (id) => {
        const reference = doc(db, 'todos', id)
        await deleteDoc(reference)
        window.location.reload(false)
    }
 
    const fetchPost = async () => {
        await getDocs(collection(db, "todos"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setTodos(newData);                
                console.log(todos, newData);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    return (
        <>
             <br/>
            <br/>
            <hr />
            <section className="todo-container">
                <div className="todo">
                    <div>
                        <h1> Todo List</h1>
                        <hr/>
                        <div>
                            <Input
                                type="textarea"
                                placeholder="What do you have to do today?"
                                onChange={(e)=>setTodo(e.target.value)}
                            >
                            </Input>
                        </div>
                        <br />
                        <div className="btn-container">
                            <button
                                class='btn btn-success'
                                type="submit"
                                onClick={addTodo}
                            >
                                Submit
                            </button>
                        </div>
    
                    </div>
    
                    <div className="todo-content">
                    <Table
                        hover
                        responsive
                        striped
                    >
                        <thead>
                            <tr>
                            <th>
                                Action
                            </th>
                            <th>
                                Content
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos?.map((todo,i) => {
                            return (
                                <tr>
                                    <th scope="row" key={i}>
                                        <button 
                                            className='btn btn-secondary'
                                            onClick={(e) => handleClick(todo.id)}
                                        >
                                            Done
                                        </button>
                                    </th>
                                    <td>
                                        {todo.todo}
                                    </td>
                                </tr>
                            );
                            })
                            }
                        </tbody>
                    </Table>
                    </div>
                </div>
            </section>
        </>
    )
}
 
export default ToDo