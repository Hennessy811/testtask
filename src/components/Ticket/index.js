import React from 'react';
import s from './Ticket.module.scss';
import {generateDurationStr, generateStopsStr, generateTimeStr, stopsCount} from "../../helpers";

const Ticket = ({ticket}) => {
  const {price, carrier, segments} = ticket;

  const segm = segments.map((segment, id) => {

    const stops = stopsCount(segment.stops);
    const time = generateTimeStr(segment.date, segment.duration);
    const duration = generateDurationStr(segment.duration);
    const stopsString = generateStopsStr(segment.stops);

    return (
      <div key={`${segment.date}_${id}`} className={s.ticket__info}>
        <div className={s.ticket__info_top}>
          <span>{segment.origin} – {segment.destination}</span>
          <span>В пути</span>
          <span>{stops}</span>
        </div>
        <div className={s.ticket__info_bottom}>
          <span>{time}</span>
          <span>{duration}</span>
          <span>{stopsString}</span>
        </div>
      </div>
    )

  })

  return (
    <div className={s.ticket}>
      <div className={s.ticket__header}>
        <span className={s.ticket__price}>{(price).toLocaleString('ru')} P</span>
        <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="Logo" className="ticket__img"/>
      </div>
      {segm}
    </div>
  );
}

export default Ticket;