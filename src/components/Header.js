import React from "react";
import ticketsImage from "./../Img/tickets.jpeg";
function Header(){
  return (
    <React.Fragment>
    <h1>Help Queue</h1>
    <img src={ticketsImage} alt="girl eating popcorn" />
    </React.Fragment>
  );
}

export default Header;