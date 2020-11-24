import React, {useRef, useState } from "react";
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
    }

    function endSelect(date) {
        date = moment(date).format("YYYY-MM-DD");
        end.current = date;
    }
      
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
      </>
  
      
    );
  };
  export default Example;
