import React from 'react';
import { func, array } from 'prop-types';

import ConfigColor from './ConfigColor';
import WordSearchAdd from './WordSearchAdd';

const ConfigAffiche = ({
  onColorChange,
  words,
  addWord,
  setColor,
  drawPuzzle,
  giveBoldToItemsWithId,
  staticUpdatePuzzle,
}) => {
  return (
    // {/* Formulier */}
    <form className="config-affiche">
      <WordSearchAdd
        giveBoldToItemsWithId={giveBoldToItemsWithId}
        addWord={addWord}
        drawPuzzle={drawPuzzle}
        staticUpdatePuzzle={staticUpdatePuzzle}
      />

      <ConfigColor
        onColorChange={onColorChange}
        setColor={setColor}
        staticUpdatePuzzle={staticUpdatePuzzle}
      />
    </form>
  );
};

ConfigAffiche.propTypes = {
  onColorChange: func.isRequired,
  words: array.isRequired,
  addWord: func.isRequired,
  setColor: func.isRequired,
  drawPuzzle: func.isRequired,
  giveBoldToItemsWithId: func.isRequired,
  staticUpdatePuzzle: func.isRequired,
};

export default ConfigAffiche;
