import React from 'react'
import './Menu.scss'
import { AddButton } from './AddButton'
export const Menu = ({img, name, price}) => {
  return (
    <div className='MenuLayout'>
      <div className='MenuLeft'>
        <img className='MenuImg' src={img}/>
        <div className='MenuContent'>
          <p className='MenuName'>{name}</p>
          <p className='MenuPrice'>{price}</p>
        </div>
      </div>
      <AddButton/>
    </div>
  )
}
