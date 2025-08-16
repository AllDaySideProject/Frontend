import React, {useEffect, useRef, useState} from 'react'
import ScreenContainer from '../../components/ScreenContainer'
import { Menu } from '../menuSelection/components/Menu'
import { StoreSelectionModal } from '../menuSelection/components/StoreSelectionModal'
import {SuggestionType} from './components/SuggestionType'
import { CompleteButton } from '../menuSelection/components/CompleteButton'
import diet from '../../assets/aiSuggestion/diet.svg'
import bulkUp from '../../assets/aiSuggestion/bulk_up.svg'
import lowBloodSuger from '../../assets/aiSuggestion/low_blood_sugar.svg'
import lowCarBo from '../../assets/aiSuggestion/low_carbohydrate.svg'
import HeaderArrow from '../../components/HeaderArrow'
import './AiSuggestion.scss'

const link="https://via.placeholder.com/100"

const dummyDataType=[
  {imgSrc: diet,          name: '다이어트', imgWidth: 35, imgHeight: 35},
  {imgSrc: lowCarBo,      name: '저탄고지', imgWidth: 40, imgHeight: 40},
  {imgSrc: bulkUp,        name: '벌크업',   imgWidth: 50, imgHeight: 50},
  {imgSrc: lowBloodSuger, name: '혈당',     imgWidth: 40, imgHeight: 40},
]
const dummyDataMenu=[
  { img: link, name: "진미채볶음" },
  { img: link, name: "겉절이김치" },
  { img: link, name: "멸치볶음" },
  { img: link, name: "마늘 장아찌" },
  { img: link, name: "고구마 맛탕" },
  { img: link, name: "무조림" },
  { img: link, name: "두부조림" },
  { img: link, name: "미역줄기 볶음" },
  { img: link, name: "가지찜" },
  { img: link, name: "오이 미역 냉국" },
  { img: link, name: "콩나물 무침" },
  { img: link, name: "청포묵 무침" },
  { img: link, name: "소고기 장조림" },
  { img: link, name: "닭가슴살 채소볶음" },
  { img: link, name: "계란찜" },
  { img: link, name: "시금치 된장국" },
]
export const AiSuggestion = () => {
  const [selectedType, setSelectedType]=useState(dummyDataType[0].name);
  const [showStoreModal, setShowStoreModal]=useState(false);
  const [menuForModal, setMenuForModal]=useState(null);
  const [selectedMenus, setSelectedMenus]=useState([]);
  const listRef=useRef(null);

  const handleTypeClick=(name)=>{
    setSelectedType(name);
    //api 처리 등
    
    //스크롤 맨 위로 올리기
    requestAnimationFrame(()=>{
      listRef.current?.scrollTo?.({top:0, behavior:'smooth'});
    })
  }
  const handleAddClick=(menu)=>{
    setMenuForModal(menu);
    setShowStoreModal(true);
  };

  const handleModalComplete=(menuName, storeName, quantity)=>{
    setSelectedMenus((prev)=>[
      ...prev, 
      {name: menuName, store: storeName, quantity, price: quantity*4500},
    ])
    setShowStoreModal(false);
    setMenuForModal(null);
  }
  const handleDelete = (menuName) => {
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
            {dummyDataType.map((item, index) => (
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
         {/* 메뉴 리스트 */}
        <div className="MenuList" ref={listRef}>
          {dummyDataMenu.map((m) => {
            const menuDetails = selectedMenus.find((sel) => sel.name === m.name);
            return (
              <Menu
                key={m.name}
                img={m.img}
                name={m.name}
                isSelected={!!menuDetails}
                menuDetails={menuDetails}
                onAddClick={() => handleAddClick(m)}
                onDelete={() => handleDelete(m.name)}
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
      />
    </ScreenContainer>
  )
}
