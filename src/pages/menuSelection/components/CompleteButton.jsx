import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreSelectionModal } from './StoreSelectionModal'
import './CompleteButton.scss'

export const CompleteButton = ({ selectedMenus = [] }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMenuName, setModalMenuName] = useState('');
  
  const handleButtonClick = () => {
    // 완료 버튼 클릭 시 기존 동작 유지
    console.log('완료 버튼 클릭');
  }

  const handleAddButtonClick = (menuName) => {
    // + 버튼 클릭 시 해당 메뉴의 모달 열기
    setModalMenuName(menuName);
    setIsModalOpen(true);
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMenuName('');
  }
  
  return (
    <>
      <div className='buttonLayout'>
        <button 
          className='buttonContent' 
          onClick={handleButtonClick}
          aria-label="메뉴 선택 완료"
        >
          완료
        </button>
      </div>
      
      <StoreSelectionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedMenus={[modalMenuName]}
      />
    </>
  )
}
