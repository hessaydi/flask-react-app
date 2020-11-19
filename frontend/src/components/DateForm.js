import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import  Datepicker from 'react-datepicker';
import axios from 'axios';
export const DateForm = ({ onNewDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [diff, setDiff] = useState(null);

  const handleDiff = (date)=>{
    setEndDate(date);
    if (startDate < endDate){
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const differenceMs = Math.abs(startDate - endDate);
      var res =  Math.round(differenceMs / ONE_DAY);
      setDiff(res);
    }else{
      setDiff(0)
    }
  }
  return (
    <Form>
      <Form.Field>
        <Datepicker selected={startDate} onChange={date => setStartDate(date)} />
      </Form.Field>
      <Form.Field>
        <Datepicker selected={endDate} onChange={handleDiff} />
      </Form.Field>
      <Form.Field>
        rangeDate: {diff}
      </Form.Field>
      <Form.Field>
        <Button
        onClick={() => {
            const date = { date_start: startDate ,date_end: endDate, diffrence: diff };
            axios.post("/dates",date)
              .then(function (response) {
                console.log(response.data);
                onNewDate(response.data)
              })
              .catch(function (error) {
                console.log(error);
              });
            }}
           >
          submit
        </Button>
      </Form.Field>
    </Form>
  );
};
