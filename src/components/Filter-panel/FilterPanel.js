import React from 'react';
// В нейминге файлов и папок лучше придерживаться чего-то одного: FilterPanel/Filter-panel 
import s from './Filter-panel.module.scss';
// можно просто cn (имхо, clsx немного удобнее)
import classNames from "classnames";

const FilterPanel = ({onChangeHandler, filterState, stops}) => {
  return (
    <aside className={s.filterPanel}>
      <span className={s.filterPanel__header}>количество пересадок</span>
      <div className="filterPanel__checklist">
        {stops.map(({id, key, value}, i) => {
          return (
            <div
              key={key}
              className={
                classNames(s.filterPanel__item,
                  {[s.active]: filterState[i]}
                )
              }>
              <input
                value={key}
                checked={filterState[i]}
                onChange={() => onChangeHandler(id)}
                type="checkbox"
                id={key}
              />
              <label htmlFor={key}>{value}</label>
            </div>
          )
        })}
      </div>
    </aside>
  );
};

export default FilterPanel;