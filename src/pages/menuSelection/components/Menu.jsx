import React from 'react'
import './Menu.scss'
export const Menu = ({key, img, name, isSelected, onClick}) => {
  
  return (
     <div className={`MenuWrapper ${isSelected ? 'selected': ''}`} onClick={onClick}>
      <img src={img} />
      <p>{name}</p>
    </div>
  )
}
