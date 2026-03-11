import React from 'react'
import { useState } from 'react';
import moment from "moment-jalaali";

const Shamsy_insert = () => {

    const [name,setName] = useState("");
    const [date,setDate] = useState("");

    const handleDateFocus = () =>{
        const today = moment().format("jYYYY/jMM/jDD");
        setDate(today);
    }

    const handleSubmit = async () =>{

        const data = {
        name: name,
        date: date
        };

        const res = await fetch("http://localhost:5000/api/train/add",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
        });

        const result = await res.json();

        if(result.success){
        alert("Saved Successfully");
        setName("");
        setDate("");
        }
    }

  return (
    <div className='flex justify-center items-center text-white/80 flex-col gap-10'>
        <div className='flex gap-2'>
            <div>
                <label htmlFor="">Name: </label>
                <input 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                placeholder=' name' 
                className='p-2 border ml-2'/>
            </div>
            <div>
                <label htmlFor="">date: </label>
                <input 
                type="text"
                value={date}
                onFocus={handleDateFocus}
                onChange={(e)=>setDate(e.target.value)} 
                placeholder=' date' 
                className='p-2 border ml-2'/>
            </div>
        </div>
        <div>
            <button className='border p-2'onClick={handleSubmit}>save</button>
        </div>
    </div>
  )
}

export default Shamsy_insert
