import React from 'react';
import './AddButton.scss';
import garbageCanIcon from '../../../assets/garbageCan.svg';

export const AddButton = ({ isSelected, onClick, onAddClick, onDelete }) => {
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
    >
      +
    </button>
  );
};
