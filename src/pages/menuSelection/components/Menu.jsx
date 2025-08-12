import React from 'react'
import './Menu.scss'
import { AddButton } from './AddButton'

export const Menu = ({img, name, price, isSelected, onClick, onAddClick, onDelete, menuDetails}) => {
  return (
    <div className='MenuLayout'>
      <div className='MenuLeft'>
        <img className='MenuImg' src={img} alt='사진입니다'/>
        <div className='MenuContent'>
          <p className='MenuName'>{name}</p>
          {menuDetails && (
            <>
              <p className='MenuDetails'>{menuDetails.store} | 수량: {menuDetails.quantity}개</p>
              <p className='MenuPrice'>{menuDetails.price.toLocaleString()} 원</p>
            </>
          )}
          {price && !menuDetails && <p className='MenuPrice'>{price}</p>}
        </div>
      </div>
      <AddButton isSelected={isSelected} onClick={onClick} onAddClick={onAddClick} onDelete={onDelete}/>
    </div>
  )
}
