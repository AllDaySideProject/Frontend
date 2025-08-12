import "./HeaderArrow.scss";

import React from 'react'
import ScreenContainer from './ScreenContainer'
import { useNavigate } from 'react-router-dom'

import BACK from "../assets/back.svg";

export const HeaderArrow = () => {
  // const navigate=useNavigate();
  // const handleClick=()=>{
  //   navigate(-1);
  // }
  return (
    <ScreenContainer> 
      {/* <p onClick={handleClick}>{'<'}</p> */}
      <div className = "arrowContainer">
        <img src = { BACK } />
      </div>
    </ScreenContainer>
  )
}