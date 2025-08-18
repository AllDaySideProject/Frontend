import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"
import { useEffect, useRef, useState } from "react";
import { Toast } from "./Toast";

export const BottomSheet = ({ height, setHeight, storeId, setStoreId, stores, setShowToast, categoryLabels}) => {
    const store = stores.find(s => s.id === storeId); // 선택된 가게 정보

    const menuData = { // 가게별 메뉴 데이터
        1: [
            { id: 1, name: "진미채볶음", originalPrice: 4500, price: 3600, count: 0, category: "SEASONED" },
            { id: 2, name: "계란말이", originalPrice: 5000, price: 4000, count: 0, category: "SEASONED" },
            { id: 3, name: "겉절이김치", originalPrice: 3000, price: 1500, count: 0, category: "SEASONED" },
            { id: 4, name: "마늘장아찌", originalPrice: 3500, price: 2500, count: 0, category: "SEASONED" },
            { id: 5, name: "고구마맛탕", originalPrice: 5000, price: 4000, count: 0, category: "BRAISED" },
            { id: 6, name: "멸치볶음", originalPrice: 2500, price: 2000, count: 0, category: "STIR_FRY" },
        ],
        2: [
            { id: 1, name: "떡볶이", originalPrice: 6000, price: 5000, count: 0, category: "STIR_FRY" },
            { id: 2, name: "순대", originalPrice: 4000, price: 3500, count: 0, category: "STIR_FRY" },
        ],
        3: [
            { id: 1, name: "멸치볶음", originalPrice: 3000, price: 2500, count: 0, category: "STIR_FRY" },
            { id: 2, name: "김치찌개", originalPrice: 7000, price: 6000, count: 0, category: "SOUP" },
        ],
    };

    const [menus, setMenus] = useState(menuData[storeId] || []); // 선택된 가게의 메뉴 데이터

    useEffect(() => { // 가게가 변경될 때 메뉴 데이터 업데이트
        if (storeId) {
            setMenus(menuData[storeId] || []);
        }
    }, [storeId]);

    // const [sheetHeight, setSheetHeight] = useState(24.63); // 초기 높이 24.63rem
    const startY = useRef(0); // 드래그 시작 위치
    const startHeight = useRef(0); // 드래그 시작 시 높이

    const handleDragStart = (e) => { // 드래그 시작
        startY.current = e.touches ? e.touches[0].clientY : e.clientY;
        startHeight.current = height;
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDragMove);
        document.addEventListener("touchend", handleDragEnd);
    };

    const handleDragMove = (e) => { // 드래그 중
        const currentY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = startY.current - currentY; // 위로 올리면 양수
        let newHeight = startHeight.current + (deltaY / 16);
        
        // 최소 24.63rem 최대 40.19rem
        newHeight = Math.max(24.63, Math.min(newHeight, 40.19));
        setHeight(newHeight);
    };

    const handleDragEnd = () => { // 드래그 종료
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragEnd);
        document.removeEventListener("touchmove", handleDragMove);
        document.removeEventListener("touchend", handleDragEnd);
    };

    const updateCount = (id, delta) => { // 수량 변경
        setMenus(prev =>
            prev.map(m =>
                m.id === id ? { ...m, count: Math.max(m.count + delta, 0) } : m
            )
        );

        if (delta > 0) {
            setShowToast(false);
            setTimeout(() => setShowToast(true), 0);
        }
    };

    console.log("storeId:", storeId);
    console.log("menus:", menus);


    return (
        <ScreenContainer>
            { height > 0 && (
                < div 
                    className = "bottomSheetBackground" 
                    onClick = { () => {
                        setHeight(0);
                        setStoreId(null);
                    }}
                />
            )}
            <div 
                className = "bottomSheet"
                style = {{ height: `${ height }rem` }}
                onClick = { (e) => e.stopPropagation() }
            >
                <div 
                    className = "bottomSheetHeader"
                    onMouseDown = { handleDragStart }
                    onTouchStart = { handleDragStart }
                >
                    <div className = "grabber">
                        {/* 그랩 바 */}
                    </div>
                </div>
                <div className = "sheetStoreInfo">
                   <p className = "sheetStoreName">{ store.name }</p> 
                   <p className = "sheetStoreType">{ categoryLabels[store.type] }</p>
                </div>

                <div className = "sheetBoxContainer">
                    { menus.map(menu => (
                        <SheetBox
                            key = { menu.id }
                            menu = { menu }
                            onCountChange = { delta => updateCount(menu.id, delta) }
                        />
                    ))}     
                </div>               
            </div>
        </ScreenContainer>
    )
}