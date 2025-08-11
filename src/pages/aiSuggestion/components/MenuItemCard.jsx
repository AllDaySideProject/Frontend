import React from 'react'
import { AddButton } from './AddButton'
import './MenuItemCard.scss'

export const MenuItemCard = ({img, name, price}) => {
  return (
    <div className='MenuItemCardLayout'>
      <div className='MenuItemCardLeft'>
        <img className='MenuItemCardImg' src={img}/>
        <div className='MenuItemCardContent'>
          <p className='MenuItemCardName'>{name}</p>
          <p className='MenuItemCardPrice'>{price}</p>
        </div>
      </div>
      <AddButton/>
    </div>
  )
}
