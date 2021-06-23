import React from 'react';
import {Ticket} from "../index";

const TicketsList = ({tickets}) => {
  return (
    <>
      {tickets.map((ticket, id) => <Ticket key={`${ticket.price}_${id}`} ticket={ticket}/>)}
    </>
  );
};

export default TicketsList;