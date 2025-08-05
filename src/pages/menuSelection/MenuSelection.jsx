import React from 'react'
import {Menu} from './components/Menu'
import './MenuSelection.scss'
const dummyData = [
  { img: 'https://via.placeholder.com/100', name: "갈치조림" },
  { img: 'https://via.placeholder.com/100', name: "시금치" },
  { img: 'https://via.placeholder.com/100', name: "고사리" },
  { img: 'https://via.placeholder.com/100', name: "배추김치" },
  { img: 'https://via.placeholder.com/100', name: "파김치" },
  { img: 'https://via.placeholder.com/100', name: "오리고기" },
];
export  const MenuSelection = () => {
  return (
    <div className='MenuSelectionLayout'>
      <div className='MenuCard'>
        {dummyData.map((item, index)=>(
          <Menu key={index} img={item.img} name={item.name}/>
        ))}
      </div>
    </div>
  )
}

