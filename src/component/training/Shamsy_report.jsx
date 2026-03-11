import React from 'react'
import { useState } from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from 'react-date-object/locales/persian_en';

const Shamsy_report = () => {

  const [name,setName] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [data,setData] = useState([]);

  const handleSearch = async () =>{

    const url = `http://localhost:5000/api/train/search?name=${name}&startDate=${startDate}&endDate=${endDate}`;

    const res = await fetch(url);

    const result = await res.json();

    if(result.success){
        setData(result.data);
    }

  }

  return (
    <div className='flex justify-center items-center text-white/80 flex-col gap-10'>
      <div className='flex gap-2'>
            <div>
                <label >Name: </label>
                <input 
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                type="text" 
                placeholder=' name' 
                className='p-2 border ml-2'/>
            </div>
            <div>
                <label >start date: </label>
                <DatePicker 
                value={startDate}
                onChange={(date) => setStartDate(date?.format("YYYY/MM/DD"))}
                calendar={persian}
                locale={persian_en}
                calendarPosition="bottom-right"
                placeholder=' start date' 
                className='p-2 border ml-2'/>
            </div>
            <div>
                <label >end date: </label>
                <DatePicker 
                value={endDate}
                onChange={(date) => setEndDate(date?.format("YYYY/MM/DD"))}
                calendar={persian}
                locale={persian_en}
                calendarPosition="bottom-right"
                placeholder=' end date'
                className='p-2 border ml-2'/>
            </div>
        </div>
        <div>
            <button className='border p-2' onClick={handleSearch}>search</button>
        </div>
      <table>
        <thead className='border'>
            <tr >
                <th className='border p-2'>id</th>
                <th className='border p-2'>name</th>
                <th className='border p-2'>date</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item)=>(
                <tr key={item.id}>
                    <td className='border p-2'>{item.id}</td>
                    <td className='border p-2'>{item.name}</td>
                    <td className='border p-2'>{item.date}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Shamsy_report
