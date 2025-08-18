import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"
import { useEffect, useRef, useState } from "react";
import { mapMenuListGetApi } from "../../../api/map/mapMenuListGetApi";

export const BottomSheet = ({ height, setHeight, storeId, setStoreId, setShowToast, categoryLabels, userPos, setStoreDetail }) => {
    const [storeDetail, setLocalStoreDetail] = useState(null);
    const [menus, setMenus] = useState([]); // 메뉴 리스트

    useEffect(() => {
        if (!storeId || !userPos) return;

        const fetchMenus = async () => {
            try {
                const data = await mapMenuListGetApi(storeId, userPos.lat, userPos.lng);
                setLocalStoreDetail(data);
                setStoreDetail(data);
                setMenus(data.menus || []); // 메뉴 리스트
            } catch (error) {
                console.error("메뉴 조회 실패", error);
            }
        };

        fetchMenus();
    }, []);

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
                m.menuId === id ? { ...m, quantity: Math.max(m.quantity + delta, 0) } : m
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
                   <p className = "sheetStoreName">{ storeDetail?.name }</p> 
                   <p className = "sheetStoreType">{ categoryLabels[storeDetail?.category] }</p>
                </div>

                <div className = "sheetBoxContainer">
                    { menus.map(menu => (
                        <SheetBox
                            key = { menu.menuId }
                            menu = {{
                                id: menu.menuId,
                                name: menu.name,
                                salePrice: menu.costPrice,
                                originalPrice: menu.salePrice,
                                availableQuantity: menu.quantity,
                                count: 0,
                                salePercent: menu.salePercent,
                                category: menu.category,
                            }}
                            onCountChange = { delta => updateCount(menu.menuId, delta) }
                        />
                    ))}     
                </div>               
            </div>
        </ScreenContainer>
    )
}