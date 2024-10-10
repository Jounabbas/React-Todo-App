import React, { useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./todo.css"

const todos="reactTodo"

export const Todo = () => {
  const [data, setdata] = useState("");
  const [store, setstore] = useState(()=>{
    const adddata=localStorage.getItem(todos)
    if(!adddata) return [];  
    else
    return JSON.parse(adddata)
  });  
  const [time, settime] = useState("");

  localStorage.setItem(todos,JSON.stringify(store))
 
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toDateString();
      const times = now.toLocaleTimeString();
      settime(`${date}-${times}`);
    }, 1000);

   
    return () => clearInterval(interval);
  }, []);

  const handleinput = (e) => {
    setdata(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!data) return;
    if (store.includes(data)) return;
    setstore((pre) => [...pre, data]);
    setdata("");
  };

  const delval =(val)=>{
   const dele= store.filter((cur,i)=>i!==val)
   setstore(dele)
  }
  return (
    <>
      <div className="todo">
        <h1>Todo List </h1>
        <div className="time">{time}</div>
        <form onSubmit={handlesubmit}>
          <input type="text" onChange={handleinput} value={data} />
          <button type="submit">Add data</button>
        </form>
        <div>
          {store.map((e ,i) => {
            return (
              <div key={i} className="formdata"  
              >
                {e} <MdOutlineDeleteForever className="del" 
                onClick={()=>delval(i)} 
                />
                 
              </div>
            );
          })}
        </div>
        {store.length > 0 ? (
          <button className="btn" onClick={() => setstore([])}>
            Clear all
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
