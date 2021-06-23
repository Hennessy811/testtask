import React from 'react';
import s from './Header.module.scss';
import logo from './logo.png';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.header__logo}>
        <img src={logo} alt="Logo"/>
      </div>
    </header>
  );
};

export default Header;