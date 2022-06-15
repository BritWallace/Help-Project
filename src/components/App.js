import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import 'animate.css';
import Moment from 'moment';

function App(){
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
  );
}

export default App;