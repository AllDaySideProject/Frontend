import "./PickupHeader.scss";

import { useNavigate } from 'react-router-dom'

import BACK from "../../../assets/back.svg";
import ScreenContainer from "../../../components/ScreenContainer";

export const PickupHeader = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/");
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