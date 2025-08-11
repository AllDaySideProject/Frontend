import React ,{useState}from 'react'
import {Menu} from './components/Menu'
import ScreenContainer from '../../components/ScreenContainer';
import { HeaderArrow } from '../../components/HeaderArrow';
import './MenuSelection.scss'
import { CompleteButton } from './components/CompleteButton';
const link="https://via.placeholder.com/100"
const dummyData = [
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
  { img: link, name: "고사리 나물 볶음" },
  { img: link, name: "현미밥" },
  { img: link, name: "김" },
  { img: link, name: "고등어조림" },
  { img: link, name: "제육볶음" },
];
export  const MenuSelection = () => {
  const [selectMenus, setSelectMenus]=useState([]);//선택된 메뉴의 인덱스를 전달하기 위한 변수
  const handleMenuClick=(index)=>{
    setSelectMenus((prev)=>{
      return prev.includes(index) ?
          prev.filter((i)=>i!==index)//이미 선택된 경우 제거 
        : [...prev, index]//없으면 추가
    });
  }
  return (
    <ScreenContainer>
      <HeaderArrow/>
      <div className='MenuSelectionLayout'>{/*전체 페이지 구조 레이아웃*/}
        <div className='MenuSelectionTitle'>오늘은 어떤 메뉴로 <br/>밥상을 채워볼까요?</div>{/*페이지 타이틀*/}
        <div className='MenuCard'  >{/* 메뉴 카드 배치 방법*/}
          {dummyData.map((item, index)=>(
            <Menu 
              key={index} 
              img={item.img} 
              name={item.name}
              isSelected={selectMenus.includes(index)}
              onClick={()=>handleMenuClick(index)}
            />
          ))}
        </div>
      </div>
      <CompleteButton/>
    </ScreenContainer>
  )
}

