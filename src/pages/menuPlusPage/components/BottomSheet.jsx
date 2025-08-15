import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"
import { useRef, useState } from "react";
import { Toast } from "./Toast";

export const BottomSheet = () => {
    const [menus, setMenus] = useState([
        { id: 1, name: "진미채볶음", originalPrice: 4500, price: 3600, count: 0 },
        { id: 2, name: "계란말이", originalPrice: 5000, price: 4000, count: 0 },
        { id: 3, name: "멸치볶음", originalPrice: 3000, price: 2500, count: 0 },
    ]);

    const [showToast, setShowToast] = useState(false); // 토스트 메시지 표시 여부

    const [sheetHeight, setSheetHeight] = useState(24.63); // 초기 높이 24.63rem
    const startY = useRef(0); // 드래그 시작 위치
    const startHeight = useRef(0); // 드래그 시작 시 높이

    const handleDragStart = (e) => { // 드래그 시작
        startY.current = e.touches ? e.touches[0].clientY : e.clientY;
        startHeight.current = sheetHeight;
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
        setSheetHeight(newHeight);
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

    return (
        <ScreenContainer>
            <div 
                className = "bottomSheet"
                style = {{ height: `${sheetHeight}rem` }}
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
                   <p className = "sheetStoreName">유진이네 밥상</p> 
                   <p className = "sheetStoreType">한식 전문점</p>
                </div>
                
                { menus.map(menu => (
                    <SheetBox
                    key = { menu.id }
                    menu = { menu }
                    onCountChange = { delta => updateCount(menu.id, delta) }
                    />
                ))}
            </div>


            { showToast && (
                <div className = "toastContainer">
                    <Toast
                        duration = { 2000 }
                        onClose = { () => setShowToast(false) }
                    />                    
                </div>
            )}
        </ScreenContainer>
    )
}