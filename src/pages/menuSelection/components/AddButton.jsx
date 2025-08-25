import React, {useState} from 'react';
import './AddButton.scss';
import garbageCanIcon from '../../../assets/garbageCan.svg';
import addButtonGray from '../../../assets/addButton_gray.png';
import addButtonGreen from '../../../assets/addButton_green.png';

export const AddButton = ({ isSelected, onClick, onAddClick, onDelete }) => {
  const [isHover, setIsHover]=useState(false);

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  if (isSelected) {
    return (
      <div className="selectedButtons">
        <button 
          className="AddButton is-selected"
          onClick={handleAddClick}
          aria-label="선택 확인"
        >
          ✓
        </button>
        <button 
          className="deleteButton"
          onClick={handleDeleteClick}
          aria-label="삭제"
        >
          <img src={garbageCanIcon} alt="삭제" />
        </button>
      </div>
    );
  }

  return (
    <button 
      className="AddButton"
      onClick={handleAddClick}
      onMouseEnter={()=>setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
    >
      <img className="AddButton" src={isHover? addButtonGreen:addButtonGray} alt="추가"/>
    </button>
  );
};
