import React, {useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment'
 
import "react-datepicker/dist/react-datepicker.css";

import Fetch from '../src/fetch'
 
const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    let start = useRef('');
    let end = useRef('');
    const [data, setData] = useState([]);

    function startSelect(date) {
      date = moment(date).format("YYYY-MM-DD"); 
      start.current = date;
        // console.log(start);
    }

    function endSelect(date) {
        date = moment(date).format("YYYY-MM-DD");
        end.current = date;
        // console.log(end);
    }

    // async function fetchData(){
    //  await axios.get(`https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=${start.current}&dateTill=${end.current}`,{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
    //   .then(res => {
    //     setData(res.data);
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    // }

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const result = await axios.get(`https://admin.barikoi.xyz:8090/statistics/mapper?dateFrom=${start.current}&dateTill=${end.current}`,{ headers: {Authorization:'Bearer' + localStorage.getItem('token')}})
    //     setData(result.data);
    //   };
   
    //   fetchData();
    // }, []);
    
     
    return (
      <>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onSelect={startSelect}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onSelect={endSelect}
        />
        <Fetch Start={start} End={end} />
        {/* <button 
        type="button" 
        className="btn btn-success" onClick={fetchData}>Submit</button> */}
      </>
  
      
    );
  };
  export default Example;
