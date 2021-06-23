export const sortTickets = (tickets, context) => {
    switch (context.sort) {
    case 1: {
      return sortByCondition((a, b) => a.price - b.price, tickets);
    }
    case 2: {
      return sortByCondition((a, b) => timeOfFlight(a) - timeOfFlight(b), tickets);
    }
    case 3: {
      const sorterByPrice = sortByCondition((a, b) => a.price - b.price, tickets);
      return sortByCondition((a, b) => timeOfFlight(a) - timeOfFlight(b), sorterByPrice.slice(0, 20));
    }
  }
}


const sortByCondition = (condition, unsortedTickets) => [...unsortedTickets].sort(condition);

const timeOfFlight = (ticket) => ticket.segments.reduce((acc, item) => acc + item.duration, 0);