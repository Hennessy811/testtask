import React from 'react';
import loader from './loader.svg';
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader}>
      <img src={loader} alt="loader"/>
    </div>
  );
};

export default Loader;