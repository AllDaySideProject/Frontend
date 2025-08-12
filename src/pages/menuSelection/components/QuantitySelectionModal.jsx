import React, { useState } from 'react';
import './QuantitySelectionModal.scss';

export const QuantitySelectionModal = ({ isOpen, onClose, selectedMenus, selectedStore, onComplete }) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  if (!isOpen) return null;

  const quantityOptions = [1, 2, 3, 4, 5];

  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleComplete = () => {
    // 완료 처리 로직
    console.log('선택된 수량:', selectedQuantity);
    console.log('선택된 가게:', selectedStore);
    
    // onComplete 콜백 호출
    if (onComplete) {
      onComplete(selectedQuantity);
    }
    
    // onClose() 제거 - StoreSelectionModal에서 처리하도록 함
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="pageIndicator">
          <div className="indicator"></div>
          <div className="indicator active"></div>
        </div>
        
        {/* 메뉴 이름 */}
        <div className="menuName">
          {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'}
        </div>
        <div className="quantitySelectionTitle">
          수량을 선택해 주세요
        </div>
        
        {/* 수량 목록 */}
        <div className="quantityList">
          {quantityOptions.map((quantity) => (
            <div 
              key={quantity}
              className={`quantityItem ${selectedQuantity === quantity ? 'selected' : ''}`}
              onClick={() => handleQuantitySelect(quantity)}
            >
              <div className="quantityInfo">
                <div className="quantityText">{quantity}개</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 완료 버튼 */}
        <div className="modalFooter">
          <button className="completeButton" onClick={handleComplete}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
