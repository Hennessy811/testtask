import React from 'react';
import s from './Show-more.module.scss';

const ShowMore = ({showMoreHandler}) => {
  return (
    <div className={s.showMore}>
      <button
        onClick={showMoreHandler}
        className={s.btn}>Показать еще 5 билетов!</button>
    </div>
  );
};

export default ShowMore;