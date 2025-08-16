import "./PickupHeader.scss";

import React from 'react'
import { useNavigate } from 'react-router-dom'

import BACK from "../../../assets/back.svg";
import ScreenContainer from "../../../components/ScreenContainer";

export const PickupHeader = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(-1);
  }

  return (
    <ScreenContainer> 
      <div className = "pickupHeader">
        <img 
            src = { BACK } 
            onClick = { handleClick }
        />
      </div>
    </ScreenContainer>
  )
}