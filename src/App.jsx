import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Heading from './Componets/Heading'
import Animation from './Componets/Animation.jsx'
import { getDatabase, ref, set, push ,onValue } from "firebase/database";
import { ToastContainer, toast, Bounce } from 'react-toastify';




function App() {


  const [task, setTask] = useState("")
  const [Todos,setTodos]=useState([])

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
      
      set(newRef, { TodoName: task })
        .then(() => {
          notify();
          setTask("");
        })
    }
  }

  useEffect(()=>{
    const db = getDatabase();
    const TodoRef = ref(db, 'Todo/');
    onValue(TodoRef, (items) => {
      // const data = items.val();
      // Arry.push(data)
      // setTodos(Arry)
      
      const Arry = [];
      items.forEach((item)=>{
        Arry.push(item.val());
        setTodos(Arry)
      })
    });
    
  },[])

  console.log(Todos);
  

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
                placeholder="FIl the input" onChange={handleEmail} />
            </div>
            <button
              type="submit"
              className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
              onClick={handleClick}>Submit</button>

            <div className='mt-20'>
              <ul className="w-full text-sm font-medium text-heading bg-neutral-primary-soft border border-default rounded-base">
               {
                 Todos.map((snapshot)=>{
                   return(
                      <li className="w-full px-4 text-start py-2 border-b border-default rounded-t-lg">{snapshot.TodoName}</li> 

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
