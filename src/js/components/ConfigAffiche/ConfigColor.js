import React from 'react';
import {func} from 'prop-types'

const colors = ['black', 'blue', 'pink', 'lightgray', 'orange'];

const ConfigColor = ({onColorChange, setColor, staticUpdatePuzzle}) => {
  const handleColorClick = e => {
    e.preventDefault();
    setColor(e.currentTarget.childNodes[0].value);
    staticUpdatePuzzle();
  }

  return (
    <div className='config-affiche__items'>
      {
        colors.map(color => {
          return (
            <div key={color} className="color-btn__div" style={{backgroundColor: color}} onClick={e => handleColorClick(e)}>
              <input type="radio" name="" value={color} id="color-one" className="color-btn__input" />
            </div>
          )
        })
      }

    </div>
  );
}

ConfigColor.propTypes = {
 onColorChange: func.isRequired,
 setColor: func.isRequired,
 staticUpdatePuzzle: func.isRequired
};

export default ConfigColor;
