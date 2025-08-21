import React ,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import {Menu} from './components/Menu'
import ScreenContainer from '../../components/ScreenContainer';
import HeaderArrow from '../../components/HeaderArrow';
import { CompleteButton } from './components/CompleteButton';
import { StoreSelectionModal } from './components/StoreSelectionModal';
import menuSuggestGet from '../../api/menuSelection/menuSuggestGet';
import {categoryIcons} from '../../assets/icons/categoryIcons';
import { useCurrentPosition } from '../../hooks/useCurrentPosition';
import { useMenu } from '../../components/MenuContext';
import './MenuSelection.scss'
//양재 at 센터 위경도 
const FIXED_LAT = 37.4683;
const FIXED_LNG = 127.0391;
const FIXED_POS = { lat: FIXED_LAT, lng: FIXED_LNG };

export  const MenuSelection = () => {
  const navigate=useNavigate();
  const {menus: cartMenus, addMenu, updateCount, removeMenu}=useMenu();//로컬에 저장하는 용도

  const [menus, setMenus]=useState([]);
  const [selectMenus, setSelectMenus]=useState([]);//선택된 메뉴의 인덱스를 전달하기 위한 변수
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMenuName, setModalMenuName] = useState('');
  const [selectedMenuDetails, setSelectedMenuDetails] = useState({}); // 선택된 메뉴의 상세 정보 저장
  
   //현재 위치 받아오기
  const { pos, loading, request } = useCurrentPosition();
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  
  //pos=lat, lng
  // 마운트 시 위치 요청
  useEffect(() => {
    request();
  }, [request]);

  //위치가 준비되면 api 호출
  useEffect(() => {
    if (!pos) return;
    (async () => {
      try {
        setFetching(true);
        setFetchError(null);

        // const response = await menuSuggestGet(pos.lat, pos.lng);
        console.log(pos.lat, pos.lng);
        const response = await menuSuggestGet(FIXED_LAT, FIXED_LNG);
        // 서버 응답은 { data: [...] } 형태
        const mapped = Array.isArray(response.data)
          ? response.data.map((d, idx) => ({
              id: idx + 1, // 서버에 id 없으니 임시 부여
              name: d.name,
              category: d.category,
              img: categoryIcons[d.category], // 카테고리별 아이콘 
            }))
          : [];

        setMenus(mapped);
      } catch (e) {
        setFetchError("추천 메뉴를 불러오지 못했습니다.");
      } finally {
        setFetching(false);
      }
    })();
}, [pos]);
//로컬에 메뉴가 있으면 해당 메뉴 selected상태 랜더링
  useEffect(()=>{
    if(!cartMenus)return;
    //이름 기준으로 일치하는 카드 인덱스 숮집
    const nameSet = new Set(cartMenus.map(cm=>cm.name));
    const indices=[];
    menus.forEach((it,idx)=>{
      if(nameSet.has(it.name)) indices.push(idx);
    });

    //상세 정보
  
    setSelectedMenuDetails(()=>{
      const next={};
      cartMenus.forEach(cm=>{
        next[cm.name]={
          menuId:cm.menuId,
          store:cm.store,//가게 명
          quantity:cm.count,//수량
          unitPrice:cm.unitPrice,//가격
          price:(cm.unitPrice)*(cm.count),//총액
        };
      });
    return next; 
    });
    
    setSelectMenus(indices);
  }, [menus, cartMenus]);


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

  
  const handleModalComplete = (
    menuName, 
    storeName, 
    quantity, 
    unitPrice,
    menuId,
    stock) => {
    // 모달 완료 시 선택된 메뉴 정보 저장

    const price = (Number(unitPrice) || 0) * (Number(quantity) || 1);

    setSelectedMenuDetails(prev => ({
      ...prev,
      [menuName]: {
        menuId,
        store: storeName,
        quantity,
        unitPrice,//개별 가격  
        price,//총액
      }
    }));
      // 해당 메뉴를 선택 상태로 만들기

    const menuIndex = menus.findIndex(item => item.name === menuName);
    if (menuIndex !== -1 && !selectMenus.includes(menuIndex)) {
      setSelectMenus(prev => [...prev, menuIndex]);
    }

    addMenu({//로컬에 최초 메뉴 1개 담기
      menuId:menuId,
      name:menuName,
      store:storeName,
      unitPrice,
      quantity:stock,
    });
    const extra=Math.max(0, Number(quantity)-1);
    if(extra>0){
      updateCount(menuId, extra);
    }

    setIsModalOpen(false);
    setModalMenuName('');
  };

  const handleDeleteMenu = (menuName, menuId) => {
    removeMenu(menuId);
    // 선택된 메뉴 정보 삭제
    setSelectedMenuDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[menuName];
      return newDetails;
    });
    
    // selectMenus에서도 제거
    const menuIndex = menus.findIndex(item => item.name === menuName);
    if (menuIndex !== -1) {
      setSelectMenus(prev => prev.filter(index => index !== menuIndex));
    }
  };
  
  return (
    <ScreenContainer>
      <HeaderArrow/>
      <div className='MenuSelectionLayout'>{/*전체 페이지 구조 레이아웃*/}
        <div className='MenuSelectionTitle'>오늘은 어떤 메뉴로 <br/>밥상을 채워볼까요?</div>{/*페이지 타이틀*/}
        {/* 상태 표시 */}
        {loading && <div className="MenuLoading">내 위치 확인 중…</div>}
        {fetching && <div className="MenuLoading">추천 메뉴 불러오는 중…</div>}
        {fetchError && <div className="MenuError">{fetchError}</div>}


        <div className='MenuCard'  >{/* 메뉴 카드 배치 방법*/}
          {menus.map((item, index)=>(
            <Menu 
              key={item.id} 
              img={item.img} 
              name={item.name}
              isSelected={selectMenus.includes(index)}
              onClick={()=>handleMenuClick(index)}
              onAddClick={() => handleAddButtonClick(item.name)}
              onDelete={() => 
                handleDeleteMenu(item.name, selectedMenuDetails[item.name]?.menuId)}
              menuDetails={selectedMenuDetails[item.name]} // 선택된 메뉴의 상세 정보 전달
            />
          ))}
        </div>
      </div>
      <CompleteButton onClick={() => navigate('/home')}/>
      
      
      {/* 모달 */}
      <StoreSelectionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedMenus={[modalMenuName]}
        onComplete={handleModalComplete} // 완료 콜백 
        coord={FIXED_POS}
        coordsLoading={loading}
      />
    </ScreenContainer>
  )
}

