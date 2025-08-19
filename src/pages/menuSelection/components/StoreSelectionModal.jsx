  import React, { useEffect, useState, useRef } from 'react';
  import './StoreSelectionModal.scss';
  import { QuantitySelectionModal } from './QuantitySelectionModal';
  import greenBasketIcon from '../../../assets/greenBasket.png';
  import menuDetailGet from '../../../api/menuSelection/menuDetailGet';
  //양재 at 센터 위경도 
  const FIXED_LAT = 37.4683;
  const FIXED_LNG = 127.0391;


  // GreenBasket Icon 컴포넌트
  const GreenBasketIcon = () => (
    <img src={greenBasketIcon} alt="장바구니" className="s-basketIcon" />
  );
  // 각 항목 높이 (px) 및 행 규격
  const ITEM_HEIGHT = 40;   
  const PER_ROW= ITEM_HEIGHT;
  const CONTAINER_ROWS = 3;//한번에 보여줄 가게 개수
  const CONTAINER_HEIGHT = ITEM_HEIGHT * CONTAINER_ROWS;
  // 마지막 아이템이 맨 위까지 올라올 수 있도록 하는 여유 높이
  const BOTTOM_SPACER = CONTAINER_HEIGHT - (ITEM_HEIGHT*1.5);

  export const StoreSelectionModal = ({ isOpen, onClose, selectedMenus, onComplete, coord, coordsLoading}) => {
    const [stores, setStores]= useState([]);
    const [selectedStore, setSelectedStore] = useState('');

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [step, setStep] = useState('store');

    const [shellEnter, setShellEnter]=useState(false);//모달 쉘 최초 등장 시 
    const listRef=useRef(null);

    
    //위치가 준비되면 api 호출
    useEffect(()=>{
      
      console.log("menuDetails 호출");
      if(!isOpen) return;
      if (!coord){
        console.log("coord에서 걸림");
        return;
      }  // 좌표 아직 없으면 대기
      (async()=>{
        try{
          const menuName=selectedMenus?.[0] ?? '';
          const lat=Number (coord.lat.toFixed(4));
          const lng=Number (coord.lng.toFixed(4));
          const response=await menuDetailGet(lat, lng, menuName);
          const raw = response?.data ?? [];

          const list = raw.map((s, idx) => ({
            id: s.menuId ?? idx,
            name: s.storeName,
            distance: `${(s.distance ?? 0).toFixed(1)}km`,
            price: `${(s.salePrice ?? 0).toLocaleString()}원`,
            quantity: s.quantity ?? 0,
          }));
          setStores(list);
          setStep('store');//열릴 때 항상 첫단계로
          setShellEnter(true);//쉘 slideUp 트리거
          setSelectedStore(list?.[0]?.name ?? '');
        }catch(error){
          console.log("가게 불러오기 실패", error);
          setStores([]);
          setSelectedStore('');
        }
      })();
    }, [isOpen, coord, selectedMenus]);
    
    if (!isOpen) return null;

    
    //스크롤만으로 선택되도록 함 -> 스크롤 위치 기준 상단에서 가장 가까운 항목 선택
    const handleStoreScroll=()=>{
      if(!listRef.current) return;
      const st=listRef.current.scrollTop;
      const index=Math.round(st/PER_ROW);//상단 기준 현재 행 계산하기
      const clamped=Math.min(Math.max(index,0), stores.length-1);
      const name=stores[clamped].name;
      if(name!==selectedStore) setSelectedStore(name);
    }

    const goQuantity=()=>setStep('quantity');
    const goBasket=()=>setStep('basket');

    const handleQuantityComplete=(quantity)=>{
      setSelectedQuantity(quantity);
      setStep('basket');//패널 우->좌로 전환
    };

    const handleBasketDone=()=>{
      if(onComplete&& selectedMenus?.length>0){//메뉴가 선택된 경우 onComplete 호출
        onComplete(selectedMenus[0], selectedStore, selectedQuantity);
      }
      onClose?.();//onClose가 존재할 때만 모달을 종료
    };
  

    return (
      <div className="s-modalOverlay" onClick={onClose}>
        <div
          className={`s-modalContent ${shellEnter ? 's-shellEnterFromBottom' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 단계별 패널 렌더 */}
          {step === 'store' && (
            <div className="s-panel">
              <div className="s-pageIndicator">
                <div className="s-indicator active"></div>
                <div className="s-indicator"></div>
              </div>

              <div className="s-menuName">
                {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'}
              </div>
              <div className="storeSelectionTitle">가게를 선택해 주세요</div>

              <div className="storeList" ref={listRef} onScroll={handleStoreScroll}>
                {stores.map((store, index) => {
                  const isSelected = store.name === selectedStore;
                  return (
                    <div
                      key={store.id}
                      className={`storeItem ${isSelected ? 'selected' : ''}`}
                      style={{ height: ITEM_HEIGHT }}
                    >
                      <div className="storeInfo">
                        <div className="storeName">{store.name}</div>
                        <div className="storeDetails">
                          <span className="distance">{store.distance}</span>
                          <span className="price">{store.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  className="storeListSpacer"
                  style={{ height: BOTTOM_SPACER, flex: `0 0 ${BOTTOM_SPACER}px`, minHeight: BOTTOM_SPACER }}
                />
              </div>

              <div className="s-modalFooter">
                <button className="s-completeButton" onClick={goQuantity}>
                  완료
                </button>
              </div>
            </div>
          )}

          {step === 'quantity' && (
            <div className="s-panel s-panelInFromRight">
              {/* 수량 화면을 '임베디드' 모드로 렌더 */}
              <QuantitySelectionModal
                isOpen={true}
                embedded
                selectedMenus={selectedMenus}
                selectedStore={selectedStore}
                onClose={onClose}
                onComplete={handleQuantityComplete}
              />
            </div>
          )}

          {step === 'basket' && (
            <div className="s-panel s-panelInFromRight">
              <div className="s-completionMessage">
                {selectedMenus && selectedMenus.length > 0 ? selectedMenus[0] : '진미채볶음'} {selectedQuantity}개
                <span className="s-msgRest">가 추가되었어요.</span>
              </div>
              <div className="s-basketContainer">
                <GreenBasketIcon />
              </div>
              <div className="s-modalFooter">
                <button className="s-completeButton" onClick={handleBasketDone}>
                  완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
