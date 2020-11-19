import React, { useEffect, useState } from "react";
import "./App.css";
import { Dates } from "./components/Dates";
import { DateForm } from "./components/DateForm";
import { Container } from "semantic-ui-react";

import axios from 'axios'
const App = ()=> {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios.get('/dates')
    .then(dates=>setDates(dates.data)
      )
  }, []);

  return (
    <Container style={{ marginTop: 40 }}>
      <DateForm
      onNewDate={date =>
          setDates(currentDates => [date, ...currentDates])
        }
      />
      <Dates dates={dates} />
    </Container>
  );
}

export default App;


