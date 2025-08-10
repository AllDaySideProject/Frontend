import React, {useEffect} from 'react'
import { HeaderArrow } from '../../components/HeaderArrow'
import ScreenContainer from '../../components/ScreenContainer'
import { SuggestionType } from './components/SuggestionType'
import { MenuItemCard } from './components/MenuItemCard'
import './AiSuggestion.scss'
const link="https://via.placeholder.com/100"
const dummyDataType=[
  {img: link, name : '다이어트'},
  {img: link, name : '저탄고지'},
  {img: link, name : '벌크업'},
  {img: link, name : '비건'},
  {img: link, name : '혈당'},
]
const dummyDataMenu=[
  {img: link, name: '두부 조림', price:4500},
  {img: link, name: '미역 줄기 볶음', price:4500},
  {img: link, name: '가지 찜', price:4500},
  {img: link, name: '오이 미역 냉국', price:4500},
  {img: link, name: '콩나물 무침', price:4500},
  {img: link, name: '청포묵무침', price:4500},
]
export const AiSuggestion = () => {
  return (
    <ScreenContainer>
      <HeaderArrow/>
      <div className='AiSuggestionLayout'>
      <div className='AiSuggestionTitle'>오늘 이런 메뉴는 어떠세요?</div>
      <div className='AiSuggestionContent'>AI가 픽한 테마 별 오늘의 밥상을 만나보세요</div>
      <div className='SuggestionTypeMarqueeWrapper'>
        <div className='SuggestionTypeMarquee'>
          {dummyDataType.concat(dummyDataType).map((item, index) => (
            <SuggestionType
              key={index}
              img={item.img}
              name={item.name}
            />
          ))}
        </div>
      </div>
      <div className='ManuItemCardLayout'>
        {dummyDataMenu.map((item, index)=>(
          <MenuItemCard
            key={index}
            img={item.img}
            name={item.name}
            price={item.price}
            />
        ))}
      </div>
      </div>
    </ScreenContainer>
  )
}
