import React, { useState } from 'react';
import './StoreSelectionModal.scss';
import { QuantitySelectionModal } from './QuantitySelectionModal';
import greenBasketIcon from '../../../assets/greenBasket.png';

// GreenBasket Icon 컴포넌트
const GreenBasketIcon = () => (
  <img 
    src={greenBasketIcon} 
    alt="장바구니" 
  />
);

export const StoreSelectionModal = ({ isOpen, onClose, selectedMenus, onComplete }) => {
  const [selectedStore, setSelectedStore] = useState('희망식당');
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  
  if (!isOpen) return null;

  // 가게 데이터 
  const dummyStores = [
    { name: '희망식당', distance: '1.1km', price: '4,500원' },
    { name: '우진이네 밥상', distance: '0.7km', price: '5,600원' }
  ];

  const handleStoreSelect = (storeName) => {  
    setSelectedStore(storeName);
  };

  const handleComplete = () => {
    // 가게 선택 완료 후 수량 선택 화면으로 이동
    setShowQuantityModal(true);
  };

  const handleQuantityModalClose = () => {
    setShowQuantityModal(false);
    onClose(); // 최종적으로 모달 닫기
  };

  const handleQuantityComplete = (quantity) => {
    // 수량 선택 완료 시 greenBasket 표시 후 모달 닫기
    console.log('수량 선택 완료:', quantity);
    setSelectedQuantity(quantity);
    setShowQuantityModal(false); // 수량 선택 모달 닫기
    setShowBasket(true); // greenBasket 표시
    
    setTimeout(() => {
      console.log('3초 후 모달 닫기');
      setShowBasket(false);
      if (onComplete && selectedMenus && selectedMenus.length > 0) {
        onComplete(selectedMenus[0], selectedStore, quantity);
      }
    }, 3000);
  };

  const handleCompletionClose = () => {
    setShowBasket(false);
    if (onComplete && selectedMenus && selectedMenus.length > 0) {
      onComplete(selectedMenus[0], selectedStore, selectedQuantity);
    }
  };

  // 수량 선택 모달이 열려있으면 가게 선택 모달을 숨김
  if (showQuantityModal) {
    return (
      <QuantitySelectionModal 
        isOpen={showQuantityModal}
        onClose={handleQuantityModalClose}
        selectedMenus={selectedMenus}
        selectedStore={selectedStore}
        onComplete={handleQuantityComplete}
      />
    );
  }

  // greenBasket 표시 중일 때
  if (showBasket) {
    return (
      <div className="modalOverlay">
        <div className="modalContent completionContent">
          <div className="completionMessage">
            {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'} {selectedQuantity}개가 추가되었어요.
          </div>
          <div className="basketContainer">
            <GreenBasketIcon />
          </div>
          <div className="modalFooter">
            <button className="completeButton" onClick={handleCompletionClose}>
              완료
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="pageIndicator">
          <div className="indicator active"></div>
          <div className="indicator"></div>
        </div>
        
        {/* 메뉴 이름 기본값 진미채 볶음 */}
        <div className="menuName">
          {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'}
        </div>
        <div className="storeSelectionTitle">
          가게를 선택해 주세요
        </div>
        
        {/* 가게 목록 */}
        <div className="storeList">
          {dummyStores.map((store, index) => (
            <div 
              key={index}
              // 선택된 경우 스타일 변경
              className={`storeItem ${selectedStore === store.name ? 'selected' : ''}`}
              // 클릭 시 가게 선택
              onClick={() => handleStoreSelect(store.name)}
            >
              <div className="storeInfo">
                <div className="storeName">{store.name}</div>
                <div className="storeDetails">
                  <span className="distance">{store.distance}</span>
                  <span className="price">{store.price}</span>
                </div>
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
