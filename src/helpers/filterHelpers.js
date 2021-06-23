export const generateIndexesArr = (stopsArr) => {
  return stopsArr.reduce((acc, item, i) => {
    if (item) acc = [...acc, i]
    return acc;
  }, [])
}

export const filterTicketsByStops = (tickets, context) => {
  return tickets.filter((ticket) => {
    const {segments} = ticket;
    return segments.every(({stops}) => context.filter.includes(stops.length + 1))
  })
}