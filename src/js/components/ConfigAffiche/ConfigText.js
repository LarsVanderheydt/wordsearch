import React from 'react';
import {func} from 'prop-types'
//import {inject, observer} from 'mobx-react'

const ConfigText = ({onInput}) => {

  const handleInput = e => onInput(e);

  return (
    <div className="config-affiche__items config-affiche__inputs">
      <div className='config-affiche__item'>
        <label htmlFor='letter' className='config-affiche__label'>Letter</label>
        <input type='text' id='letter' maxLength="1" onInput={e => handleInput(e)} />
      </div>

      <div className='config-affiche__item'>
        <label htmlFor='first' className='config-affiche__label'>1ste lijn</label>
        <input type='text' id='first' onInput={e => handleInput(e)} />
      </div>

      <div className='config-affiche__item'>
        <label htmlFor='second' className='config-affiche__label'>2de lijn</label>
        <input type='text' id='second' onInput={e => handleInput(e)} />
      </div>
    </div>
  );
}

ConfigText.propTypes = {
 onInput: func.isRequired
};

export default ConfigText;
