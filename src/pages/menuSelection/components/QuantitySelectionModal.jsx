import React, { useState, useRef } from 'react';
import './QuantitySelectionModal.scss';

const ITEM_HEIGHT=40;
const CONTAINER_ROWS=3;//한번에 보일 줄 수 
const CONTAINER_HEIGHT=ITEM_HEIGHT*CONTAINER_ROWS;
const BOTTOM_SPACER=CONTAINER_HEIGHT-ITEM_HEIGHT;
export const QuantitySelectionModal = ({ 
  isOpen, 
  onClose, 
  selectedMenus, 
  selectedStore, 
  onComplete,
  embedded=false,
  maxQuantity,      
  initialQuantity = 1,
}) => {
  
  const safeMax = Math.max(1, Number(maxQuantity) || 1);
  const quantityOptions = Array.from({ length: safeMax }, (_, i) => i + 1);

  const clampInit = Math.min(Math.max(1, Number(initialQuantity) || 1), safeMax);
  const [selectedQuantity, setSelectedQuantity] = useState(clampInit);
  const listRef = useRef(null);

  const handleQuantityScroll=()=>{
    const el = listRef.current;
    if(!el) return;
    const st=el.scrollTop;
    const idx=Math.round(st/ITEM_HEIGHT);
    const clamped=Math.min(Math.max(idx, 0), quantityOptions.length-1);
    const q = quantityOptions[clamped];
    if(q!==selectedQuantity) setSelectedQuantity(q);
  };

  const handleComplete = () => {
   onComplete?.(selectedQuantity);
  };

  
  if (!isOpen) return null;
  if (embedded) {
    return (
      <div className="q-embeddedPanel">
        <div className="q-pageIndicator">
          <div className="q-indicator"></div>
          <div className="q-indicator q-active"></div>
        </div>

        <div className="q-menuName">
          {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'}
        </div>
        <div className="quantitySelectionTitle">수량을 선택해 주세요</div>

        <div className="quantityList" ref={listRef} onScroll={handleQuantityScroll} style={{ height: CONTAINER_HEIGHT }}>
          {quantityOptions.map((quantity) => (
            <div
              key={quantity}
              className={`quantityItem ${selectedQuantity === quantity ? 'selected' : ''}`}
              style={{ height: ITEM_HEIGHT }}
            >
              <div className="quantityInfo">
                <div className={`quantityText ${selectedQuantity === quantity ? 'selected' : ''}`}>{quantity}개</div>
              </div>
            </div>
          ))}
          <div className="quantitySpacer" style={{ height: BOTTOM_SPACER, flex: `0 0 ${BOTTOM_SPACER}px`, minHeight: BOTTOM_SPACER }} />
        </div>

        <div className="q-modalFooter">
          <button className="q-completeButton" onClick={handleComplete}>완료</button>
        </div>
      </div>
    );
  }
};
