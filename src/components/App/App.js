import React, {useEffect, useState} from 'react';
import s from './App.module.scss';

import {Header, FilterPanel, SortPanel, TicketsList, Loader, ShowMore} from '../index';
import {filterTicketsByStops, getSearchId, getTickets, sortTickets, values} from "../../helpers";


const App = () => {
  const {stops, sortConditions} = values;

  const [context, setContext] = useState({
    // не очень понятно, что это значит, лучше вынести в переменную и присвоить здесь
    // предполагается, что тут мы можем задать id выбранных фильтров, но если их просто перечислить здесь, это не будет работать
    // также предполагается, что если выбрано "все", то прочие фильтры не будут выбраны. как вариант, "все" будут автоматически выбирать все другие опции и автоматически отмечаться, если другие опции выбраны вручную
    // если никакие фильтры не выбраны, также должны быть показаны все варианты
    filter: stops.map(item => item.id),

    // что значит эта единица?
    sort: 1
  });

  let fetchedTickets = [];

  const [tickets, setTickets] = useState([]);

  // нам точно нужен отдельно массив отсортированных и отфильтрованных билетов?
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);

  // когда страница открылась, загрузка еще не идет (обычно)
  const [isLoading, setLoading] = useState(true);
  const [numOfTickets, setNumOfTickets] = useState(5);

  useEffect(() => {
    fetchTickets();
  }, []);

  // Эти два эффекта ниже сработают минимум 5 раз при открытии страницы, это не очень хорошо
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

  // эту функцию лучше вынести из компонента, она не относится к его логике, в идеале может быть переиспользована где угодно
  // в идеале данные можно показывать как только придет первая пачка билетов и не дожидаться, пока загрузятся все
  const subscribe = async (searchId) => {
    try {
      const gotTickets = await getTickets(searchId);

      if (gotTickets.tickets.length) {
        fetchedTickets = [...fetchedTickets, ...gotTickets.tickets];
      }

      if (gotTickets.stop) {
        setTickets(fetchedTickets);
        setLoading(false);
        return;
      }
      subscribe(searchId);
    } catch (e) {
      // таймаут тут не нужен, сервер отработает нормально и без него
      subscribe(searchId)
    }
  }

  const showMoreHandler = () => {
    setNumOfTickets(prev => prev + 5 < tickets.length ? prev + 5 : tickets.length);
  }

  // зачем нужен некий context? кажется эти значения можно просто раздельно использовать
  const onFilterHandler = (filter) => {
    setContext(prev => ({
        ...prev,
        filter
      }
    ))
  }

  // зачем нужен некий context? кажется эти значения можно просто раздельно использовать
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
