import React, { useState } from 'react';
import './StoreSelectionModal.scss';
import { QuantitySelectionModal } from './QuantitySelectionModal';
import greenBasketIcon from '../../../assets/greenBasket.png';

// GreenBasket Icon 컴포넌트
const GreenBasketIcon = () => (
  <img src={greenBasketIcon} alt="장바구니" className="s-basketIcon" />
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
    setShowQuantityModal(true); // 수량 선택 화면으로 이동
  };

  const handleQuantityModalClose = () => {
    setShowQuantityModal(false);
    onClose?.(); // 최종적으로 모달 닫기
  };

  const handleQuantityComplete = (quantity) => {
    // 수량 선택 완료 시 greenBasket 표시 후 모달 닫기
    setSelectedQuantity(quantity);
    setShowQuantityModal(false);
    setShowBasket(true);

    setTimeout(() => {
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

  // 수량 선택 모달
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

  // greenBasket 표시 화면
  if (showBasket) {
    return (
      <div className="s-modalOverlay">
        <div className="s-modalContent s-completionContent" onClick={(e) => e.stopPropagation()}>
          <div className="s-completionMessage">
            {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'} {selectedQuantity}개가 추가되었어요.
          </div>
          <div className="s-basketContainer">
            <GreenBasketIcon />
          </div>
          <div className="s-modalFooter">
            <button className="s-completeButton" onClick={handleCompletionClose}>
              완료
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 기본 가게 선택 화면
  return (
    <div className="s-modalOverlay" onClick={onClose}>
      <div className="s-modalContent s-completionContent" onClick={(e) => e.stopPropagation()}>
        <div className="s-pageIndicator">
          <div className="s-indicator active"></div>
          <div className="s-indicator"></div>
        </div>

        {/* 메뉴 이름 기본값 진미채 볶음 */}
        <div className="s-menuName">
          {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'}
        </div>
        <div className="storeSelectionTitle">가게를 선택해 주세요</div>

        {/* 가게 목록 */}
        <div className="storeList">
          {dummyStores.map((store) => (
            <div
              key={store.name}
              className={`storeItem ${selectedStore === store.name ? 'selected' : ''}`}
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
        <div className="s-modalFooter">
          <button className="s-completeButton" onClick={handleComplete}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
