import React ,{useState}from 'react'
import {Menu} from './components/Menu'
import ScreenContainer from '../../components/ScreenContainer';
import { HeaderArrow } from './components/HeaderArrow';
import './MenuSelection.scss'
import { CompleteButton } from './components/CompleteButton';
import { StoreSelectionModal } from './components/StoreSelectionModal';

const link="https://via.placeholder.com/100"
const dummyData = [
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
];

export  const MenuSelection = () => {
  const [selectMenus, setSelectMenus]=useState([]);//선택된 메뉴의 인덱스를 전달하기 위한 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMenuName, setModalMenuName] = useState('');
  const [selectedMenuDetails, setSelectedMenuDetails] = useState({}); // 선택된 메뉴의 상세 정보 저장
  
  const handleMenuClick=(index)=>{
    setSelectMenus((prev)=>{
      return prev.includes(index) ?
          prev.filter((i)=>i!==index)//이미 선택된 경우 제거 
        : [...prev, index]//없으면 추가
    });
  }

  const handleAddButtonClick = (menuName) => {
    setModalMenuName(menuName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalMenuName('');
  };

  const handleModalComplete = (menuName, storeName, quantity) => {
    // 모달 완료 시 선택된 메뉴 정보 저장
    setSelectedMenuDetails(prev => ({
      ...prev,
      [menuName]: {
        store: storeName,
        quantity: quantity,
        price: quantity * 4500 // 예시 가격 계산
      }
    }));
    
    // 해당 메뉴를 선택 상태로 만들기
    const menuIndex = dummyData.findIndex(item => item.name === menuName);
    if (menuIndex !== -1 && !selectMenus.includes(menuIndex)) {
      setSelectMenus(prev => [...prev, menuIndex]);
    }
    
    setIsModalOpen(false);
    setModalMenuName('');
  };

  const handleDeleteMenu = (menuName) => {
    // 선택된 메뉴 정보 삭제
    setSelectedMenuDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[menuName];
      return newDetails;
    });
    
    // selectMenus에서도 제거
    const menuIndex = dummyData.findIndex(item => item.name === menuName);
    if (menuIndex !== -1) {
      setSelectMenus(prev => prev.filter(index => index !== menuIndex));
    }
  };
  
  // 선택된 메뉴 이름 목록 생성
  const selectedMenuNames = selectMenus.map(index => dummyData[index].name);
  
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
              onAddClick={() => handleAddButtonClick(item.name)}
              onDelete={() => handleDeleteMenu(item.name)}
              menuDetails={selectedMenuDetails[item.name]} // 선택된 메뉴의 상세 정보 전달
            />
          ))}
        </div>
      </div>
      <CompleteButton selectedMenus={selectedMenuNames}/>
      
      {/* 모달 */}
      <StoreSelectionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedMenus={[modalMenuName]}
        onComplete={handleModalComplete} // 완료 콜백 추가
      />
    </ScreenContainer>
  )
}

