import React, {useEffect, useState} from 'react';
import s from './App.module.scss';

import {Header, FilterPanel, SortPanel, TicketsList, Loader, ShowMore} from '../index';
import {filterTicketsByStops, getSearchId, getTickets, sortTickets, values} from "../../helpers";


const App = () => {
  const {stops, sortConditions} = values;

  const [context, setContext] = useState({
    filter: stops.map(item => item.id),
    sort: 1
  });

  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [numOfTickets, setNumOfTickets] = useState(5);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    setFilteredTickets(filterTicketsByStops(tickets, context));
  }, [context, tickets]);

  useEffect(() => {
    setSortedTickets(sortTickets(filteredTickets, context));
  }, [context, filteredTickets]);

  const fetchTickets = async () => {
    const searchId = await getSearchId();
    subscribe(searchId)
  }

  const subscribe = async (searchId) => {
    try {
      const gotTickets = await getTickets(searchId);

      if (gotTickets.tickets.length) {
        setTickets(prev => [...prev, ...gotTickets.tickets]);
      }

      if (gotTickets.stop) {
        setLoading(false);
        return;
      }
      subscribe(searchId);
    } catch (e) {
      setTimeout(() => subscribe(searchId), 1000);
    }
  }

  const showMoreHandler = () => {
    setNumOfTickets(prev => prev + 5 < tickets.length ? prev + 5 : tickets.length);
  }

  const onFilterHandler = (filter) => {
    setContext(prev => ({
        ...prev,
        filter
      }
    ))
  }

  const onSortHandler = (sort) => {
    setContext(prev => ({
        ...prev,
        sort
      }
    ))
  }

  const content = isLoading ? <Loader/> : (
    <div className={s.container}>
      <Header/>
      <div className={s.content}>
        <FilterPanel onFilterHandler={onFilterHandler} stops={stops}/>
        <main className={s.main}>
          <SortPanel onSortHandler={onSortHandler} sortConditions={sortConditions}/>
          <TicketsList tickets={sortedTickets.slice(0, numOfTickets)}/>
          {sortedTickets.length ? <ShowMore showMoreHandler={showMoreHandler}/> : null}
        </main>
      </div>
    </div>
  )

  return (
    <div className="App">
      {content}
    </div>
  )
}

export default App;
