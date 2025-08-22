import React, {useEffect, useRef, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import { Menu } from '../menuSelection/components/Menu'
import { StoreSelectionModal } from '../menuSelection/components/StoreSelectionModal'
import {SuggestionType} from './components/SuggestionType'
import { CompleteButton } from '../menuSelection/components/CompleteButton'
import diet from '../../assets/aiSuggestion/diet.png'
import bulkUp from '../../assets/aiSuggestion/bulk_up.png'
import lowBloodSuger from '../../assets/aiSuggestion/low_blood_sugar.png'
import lowCarBo from '../../assets/aiSuggestion/low_carbohydrate.png'
import lowSalt from '../../assets/aiSuggestion/low_salt.png'
import HeaderArrow from '../../components/HeaderArrow'
import aiSuggestionPost from '../../api/aiSuggestion/aiSuggestionPost'
//import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { categoryIcons } from '../../assets/icons/categoryIcons'
import { useMenu } from '../../components/MenuContext'
import './AiSuggestion.scss'

const DataType=[
  {imgSrc: diet, name: '다이어트', imgWidth:35, imgHeight: 35, concept:"diet"},
  {imgSrc: lowCarBo, name: '저탄고지', imgWidth: 40, imgHeight: 40, concept: "keto"},
  {imgSrc: bulkUp, name: '벌크업', imgWidth: 50, imgHeight: 50, concept: "bulking"},
  {imgSrc: lowBloodSuger, name: '혈당', imgWidth: 40, imgHeight: 40, concept:"glycemic"},
  {imgSrc: lowSalt, name: '저염', imgWidth: 50, imgHeight: 50, concept:"low_sodium"},
]

//양재 at 센터 위경도 
const FIXED_LAT = 37.4683;
const FIXED_LNG = 127.0391;
const FIXED_POS = { lat: FIXED_LAT, lng: FIXED_LNG };


export const AiSuggestion = () => {
  const [selectedType, setSelectedType]=useState(DataType[0].name);
  const [menus, setMenus]= useState([]);//api 결과를 저장
  const [fetching, setFetching]=useState(false);
  const [fetchError, setFetchError]=useState(null);
  
  const [showStoreModal, setShowStoreModal]=useState(false);
  const [menuForModal, setMenuForModal]=useState(null);
  const [selectedMenus, setSelectedMenus]=useState([]);
  const listRef=useRef(null);
  // 현재 위치 받아오기
  // const {pos, loading:coordsLoading, request}=useCurrentPosition();
  const conceptOf=(name)=>DataType.find(d=>d.name===name)?.concept;

  const {addMenu, updateCount, removeMenu}=useMenu();
  
  useEffect(()=>{
    const concept=conceptOf(selectedType);
    if(!concept)return;
    (async()=>{
      try{
        setFetching(true);
        setFetchError(null);

        //const {lat, lng}=postMessage;
        //const result=await aiSuggestionPost(lat, lng, concept, 15);
        const result=await aiSuggestionPost(FIXED_LAT, FIXED_LNG, concept, 15);
        //응답 정규화
        const list = Array.isArray(result?.data)? result.data
        :Array.isArray(result) ? result : [];
        
        const mapped=list.map((d, idx)=>({
          id: d.id ??idx+1,
          name: d.name,
          category:d.category,
          img: categoryIcons[d.category],
          price: d.price?? 0,
        }));
        setMenus(mapped);
      }catch(error){
        setFetchError("추천 메뉴를 불러오지 못했습니다.");
      }finally{
        setFetching(false);
        //스크롤 맨 위로 올리기
        requestAnimationFrame(()=>{
          listRef.current?.scrollTo?.({top:0, behavior:'smooth'});
        });
      }
    })();
  }, [selectedType]);

  const handleTypeClick=(name)=>setSelectedType(name);
    
  const handleAddClick=(menu)=>{
    setMenuForModal(menu);
    setShowStoreModal(true);
  };

  const handleModalComplete=(
    menuName, 
    storeName, 
    quantity, 
    salePrice,
    menuId,
    stock,
    extra//{costPrice, salePercent, category}
  )=>{
    const unit = Number(salePrice)||0;//판매가
    const total=unit*(quantity||1);
    setSelectedMenus((prev)=>[
      ...prev, 
      {
        name: menuName, 
        store: storeName, 
        quantity,
        unitPrice:unit, 
        price: total,
       },
    ])
    addMenu({//로컬에 최초 메뉴 1개 담기
      id: menuId,
      menuId,
      name: menuName,
      storeName,
      category: extra.category,
      costPrice:extra.costPrice,
      originalPrice:salePrice,
      salePrice: salePrice,
      price: extra.costPrice,
      salePercent: extra.salePercent,
      quantity: stock,
      maxQuantity: stock,
    });
    const extraCount=quantity-1;
    if(extraCount>0) updateCount(menuId, extraCount);

    setShowStoreModal(false);
    setMenuForModal(null);
  }
  const handleDelete = (menuName, menuId) => {
    if(menuId)removeMenu(menuId)
    setSelectedMenus((prev) => prev.filter((m) => m.name !== menuName));
  };
  const handleModalClose = () => {
    setShowStoreModal(false);
    setMenuForModal(null);
  };

  return (
    <ScreenContainer>
      <HeaderArrow/>
      <div className='AiSuggestionLayout'>
        <div className='AiSuggestionTitle'>오늘 이런 메뉴는 어떠세요?</div>
        <div className='AiSuggestionContent'>AI가 픽한 테마 별 오늘의 밥상을 만나보세요</div>
        <div className='SuggestionTypeMarqueeWrapper'>
          <div className='SuggestionTypeMarquee'>
            {DataType.map((item, index) => (
              <SuggestionType
                key={item.name}
                imgSrc={item.imgSrc}
                imgWidth={item.imgWidth}
                imgHeight={item.imgHeight}
                name={item.name}
                selected={selectedType===item.name}
                onClick={()=>handleTypeClick(item.name)}
              />
            ))}
          </div>
        </div>
        {/* 상태 표시
        {coordsLoading && <div className="MenuLoading">내 위치 확인 중…</div>} */}
        {fetching && <div className="MenuLoading">추천 메뉴 불러오는 중…</div>}
        {fetchError && <div className="MenuError">{fetchError}</div>}
         {/* 메뉴 리스트 */}
        <div className="MenuList" ref={listRef}>
          {menus.map((m) => {
            const menuDetails = selectedMenus.find((sel) => sel.name === m.name);
            return (
              <Menu
                key={m.id?? m.name}
                img={m.img}
                name={m.name}
                isSelected={!!menuDetails}
                menuDetails={menuDetails}
                onAddClick={() => handleAddClick(m)}
                onDelete={() => handleDelete(m.name, menuDetails?.menuId)}
              />
            );
          })}
        </div>
         
         <CompleteButton/>
      </div>

      {/* 가게/수량 선택 모달 */}
      <StoreSelectionModal
        isOpen={showStoreModal}
        onClose={handleModalClose}
        selectedMenus={menuForModal ? [menuForModal.name] : []}
        onComplete={handleModalComplete}
        coord={FIXED_POS}
      />
    </ScreenContainer>
  )
}
