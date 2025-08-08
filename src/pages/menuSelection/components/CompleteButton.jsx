import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CompleteButton.scss'
export const CompleteButton = () => {
  //const navigate=useNavigate();
  const handleButtonClick=()=>{
    //navigate('');
  }
  return (
    <div className='buttonLayout'>
      <button className='buttonContent' onClick={handleButtonClick}>
        완료
      </button>
    </div>
  )
}
