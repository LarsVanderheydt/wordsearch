import React from 'react';
import {array, string} from 'prop-types'

const WordSearch = ({puzzleItems, bolds, searchWordColor}) => {
  return (
    <svg id='puzzle' viewBox="-50 -60 500 500">
      {
        puzzleItems.map((data) => {
          const {classes, x, y, val, bold, ids, id} = data;
          return (
            <text
              key={id}
              className={`puzzleSquare ${classes} ${bold ? 'bold': ''}`}
              x={35 * x}
              y={35 * y}
              textAnchor="middle"
              fill={ids.length ? searchWordColor : 'black'}>
              {val}
            </text>
          )
        })
      }
    </svg>
  );
}

WordSearch.propTypes = {
 puzzleItems: array.isRequired,
 searchWordColor: string.isRequired
};

export default WordSearch;
