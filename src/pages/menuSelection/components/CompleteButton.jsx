import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompleteButton.scss';

export const CompleteButton = ({ children = '완료', disabled = false }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/main/menu');

  return (
    <div className="buttonLayout">
      <button
        className="buttonContent"
        onClick={handleClick}
        disabled={disabled}
        aria-label="홈으로 이동"
      >
        {children}
      </button>
    </div>
  );
};
