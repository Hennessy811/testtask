import React, {useState} from 'react';
import s from './Sort-panel.module.scss';
import classNames from "classnames";

const SortPanel = ({onSortHandler, sortConditions}) => {
  const [activeCondition, setActiveCondition] = useState(1);

  const onActiveHandler = (key) => {
    setActiveCondition(key);
    onSortHandler(key);
  }

  return (
    <div className={s.sortPanel}>
      {sortConditions.map(({key, value}, i) => (
        <button
          onClick={() => onActiveHandler(key)}
          className={
            classNames(s.sortPanel__btn,
              {[s.sortPanel__btn_active]: activeCondition === (i + 1)}
            )}
          key={key}>
          {value}
        </button>
      ))
      }
    </div>
  );
};

export default SortPanel;