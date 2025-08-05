import React from 'react'
import '../MenuSelection.scss'
export const Menu = (props) => {
  return (
     <div className='MenuWrapper'>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
    </div>
  )
}
