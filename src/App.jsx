import { useEffect, useState } from 'react'
import './App.css'
import Heading from './Componets/Heading'
import Animation from './Componets/Animation.jsx'
import { getDatabase, ref, set, push, onValue, remove } from "firebase/database";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";




function App() {


  const [task, setTask] = useState("")
  const [Todos, setTodos] = useState([]);
  const [cng, setCng] = useState(false)

  const notify = () => {
    task == "" ?
      toast.error("Inter Your task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }) : toast.success('your task has been  successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
  }


  const handleEmail = (e) => {
    setTask(e.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (task == "") {
      notify()
    } else {
      const db = getDatabase();
      const newRef = push(ref(db, 'Todo/'));

      set(newRef, {
        TodoName: task
      })
        .then(() => {
          notify();
          setTask("");
        })
    }
  }

  useEffect(() => {
    const db = getDatabase();
    const TodoRef = ref(db, 'Todo/');
    onValue(TodoRef, (items) => {
      const Arry = [];
      items.forEach((item) => {
        Arry.push({
          value: item.val(),
          id: item.key
        });
      })
      setTodos(Arry)
    });

  }, [])




  const handleDelete = (id) => {
    const db = getDatabase();
    const TodoRef = ref(db, 'Todo/' + id);
    remove(TodoRef).then(() => {
      toast.error("Delete", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
      })
    })
  }


  function handleEdit(e) {
    e.preventDefault()
    setCng(!cng)
  }



  return (

    <>
      <Heading />
      <div className="relative z-10">
        <div>
          <form className=" mx-auto rounded-4xl bg-transparent backdrop-blur-3xl px-20 py-30  w-[500px] text-center mt-20 items-center ">
            <h1 className='text-3xl text-white mb-5 text-start'>Add Too your Task</h1>
            <div className="mb-5">
              <input type="text"
                id=""
                value={task}
                className="bg-neutral-secondary-medium border-none   text-heading text-sm rounded-base   block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="FIl the input"
                onChange={handleEmail}
              />
            </div>
               {
                cng ? 
                <button
                  type="submit"
                  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  onClick={handleClick}
                  typeof='button'>Submit</button> 
                  :
                <button
                  type="submit"
                  className="text-white bg-pink box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  onClick={handleClick}
                  typeof='button'>Submit</button>
              }

            <div className='mt-20'>
              <ul className="w-full text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-base">
                {
                  Todos.map((snapshot) => {
                    return (
                      <li className="w-full flex justify-between text-3xl px-5 h-full text-start py-3 border-white rounded-t-lg">
                        {snapshot.value.TodoName}
                        <div className='flex justify-between gap-5'>

                          <button
                            className='text-gray-700 text-3xl'
                            onClick={handleEdit}
                            typeof='button'>
                            <FaEdit />
                          </button>

                          <button className='text-red-500 text-3xl'
                            type='button'
                            onClick={() => handleDelete(snapshot.id)} >
                            <FaTrashAlt />
                          </button>

                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </form>


        </div>
      </div>
      <Animation />
    </>
  )
}

export default App
