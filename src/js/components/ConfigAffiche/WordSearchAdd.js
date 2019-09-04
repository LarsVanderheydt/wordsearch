import React from 'react';
import { func } from 'prop-types';

const WordSearchAdd = ({
  addWord,
  drawPuzzle,
  giveBoldToItemsWithId,
  staticUpdatePuzzle,
}) => {
  const handleBoldClick = e => {
    e.preventDefault();
    e.currentTarget.classList.toggle('activate_bold');
    giveBoldToItemsWithId(e.currentTarget.id);
    staticUpdatePuzzle();
  };

  const handleBlur = e => {
    addWord(e.currentTarget.id, e.currentTarget.value);
  };

  const handleRandom = e => {
    e.preventDefault();
    drawPuzzle();
  };

  const numberOfItems = Array.from(Array(6).keys());

  return (
    <div className="config-affiche__items config-affiche__inputs">
      {numberOfItems.map(i => (
        <div key={i} className="config-affiche__item">
          <input
            type="text"
            id={`word_${i}`}
            onBlur={e => handleBlur(e)}
            maxLength="12"
          />
          <button onClick={e => handleBoldClick(e)} id={`word_${i}_bold`}>bold</button>
        </div>
      ))}
      <button onClick={e => handleRandom(e)} className="random_btn">Random</button>
    </div>
  );
};

WordSearchAdd.propTypes = {
  drawPuzzle: func.isRequired,
  giveBoldToItemsWithId: func.isRequired,
  staticUpdatePuzzle: func.isRequired,
};

export default WordSearchAdd;
