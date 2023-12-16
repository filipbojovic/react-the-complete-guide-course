import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props; // pull out items from props

  const sortedList = useMemo(() => {
    console.log('items sorted');
    
    return props.items.sort((a, b) => a - b);
  }, [items]); // whenever items change, we want to re-memoize (re-sort) them. if we add 'props' here, this will be re-evaluated each time any property of 'props' is changed

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
