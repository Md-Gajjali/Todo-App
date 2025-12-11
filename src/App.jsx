import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Heading from './Componets/Heading'
import Animation from './Componets/Animation.jsx'
import { getDatabase, ref, set } from "firebase/database";
import {  ToastContainer ,toast ,Bounce } from 'react-toastify';




      function App() {


        const[task,setTask]=useState("")

        const notify = () => toast("plz inout the fill",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }); 


        const handleEmail = (e)=> {
          setTask(e.target.value);
        }

        const handleBtn = (e) => {
          e.preventDefault()
          if (task == "") {
            notify()
          }else{
             const db = getDatabase();
             set(ref(db, 'Todo/'), {
               Todo: task
                });
            
          }
        }

        return (

          <>
          <Heading />
            <div className="relative z-10">
            <div>
              
                <form className=" mx-auto rounded-4xl bg-transparent backdrop-blur-3xl px-20 py-30  w-[500px] text-center mt-20 items-center ">
                  <div className="mb-5">
                    <input type="text" 
                    id="" 
                    value={task}
                    className="bg-neutral-secondary-medium border  border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                    placeholder="FIl the input" onChange={handleEmail} />
                  </div>
                  <button 
                  type="submit" 
                  className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                  onClick={handleBtn}>Submit</button>
                </form>


            </div>
            </div>
            <Animation />
          </>
        )
      }

export default App
