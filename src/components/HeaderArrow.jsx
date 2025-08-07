import React from 'react'
import ScreenContainer from './ScreenContainer'
import { useNavigate } from 'react-router-dom'
export const HeaderArrow = () => {
  // const navigate=useNavigate();
  // const handleClick=()=>{
  //   navigate(-1);
  // }
  return (
    <ScreenContainer> 
      {/* <p onClick={handleClick}>{'<'}</p> */}
      <div style={{paddingLeft: '1.5rem'}}>{'<'}</div>
    </ScreenContainer>
  )
}
