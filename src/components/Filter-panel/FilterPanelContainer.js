import React, {useState} from "react";
import {generateIndexesArr} from "../../helpers";
import FilterPanel from "./FilterPanel";

// если мы используем пропсы без TypeScript, 
// очень рекомендуется указывать также propTypes и defaultProps, 
// чтобы хотя бы понимать, какие пропсы здесь могут быть
const FilterPanelContainer = (props) => {
  const {onFilterHandler, stops} = props;
  const [filterState, setFilterState] = useState(new Array(stops.length).fill(true));

  const onChangeHandler = (id) => {
    if (id === 0) {
      const updatedState = new Array(stops.length).fill(!filterState[0]);

      setFilterState(updatedState);
      onFilterHandler([...generateIndexesArr(updatedState)]);
      return;
    }

    const updatedCheckedState = filterState.map((item, i) => {
        if (i === 0) return false;
        return i === id ? !item : item
      }
    );

    setFilterState(updatedCheckedState);
    onFilterHandler([...generateIndexesArr(updatedCheckedState)])
  }
  return (
    <FilterPanel onChangeHandler={onChangeHandler} filterState={filterState} {...props} />
  )
}

export default FilterPanelContainer;