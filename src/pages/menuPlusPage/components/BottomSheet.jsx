import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"
import { useMenu } from "../../../components/MenuContext";
import { useEffect, useRef, useState } from "react";
import { mapMenuListGetApi } from "../../../api/map/mapMenuListGetApi";


export const BottomSheet = ({ height, setHeight, storeId, setStoreId, stores, setShowToast, categoryLabels, userPos, setStoreDetail }) => {
    const { addMenu, updateCount } = useMenu(); // 전역 상태에서 메뉴 추가 및 수량 변경 함수
    const store = stores.find(s => s.id === storeId); // 선택된 가게 정보

    const [storeDetail, setLocalStoreDetail] = useState(null);
    const [menus, setMenus] = useState([]); // 메뉴 리스트

    useEffect(() => {
        if (!storeId || !userPos) return;

        const fetchMenus = async () => {
            try {
                const data = await mapMenuListGetApi(storeId, userPos.lat, userPos.lng);

                setLocalStoreDetail(data);
                setStoreDetail(data);

                setMenus((data.menus || []).map(m => ({ ...m, count: 0, availableQuantity: m.quantity }))); // 메뉴 리스트
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

    const [pendingUpdate, setPendingUpdate] = useState(null); // 수량 변경 대기 상태

    const updateCountLocal = (id, delta) => {
        setMenus(prev => {
            const target = prev.find(m => m.menuId === id);
            if (!target) return prev;

            if (delta > 0 && target.count >= target.availableQuantity) { // 재고 초과
                return prev;
            }

            const next = prev.map(m => {
                if (m.menuId !== id) return m;

                let newCount = Math.max((m.count ?? 0) + delta, 0);
                if (newCount > m.availableQuantity) newCount = m.availableQuantity;

                return { ...m, count: newCount };
            });

            const menu = next.find(m => m.menuId === id);

            if (delta > 0 && menu) {
                const uniqueId = `${storeId}-${menu.menuId}`;
                if (menu.count === 1) {
                    addMenu({
                        ...menu,
                        id: menu.menuId,
                        store: storeDetail?.name,
                        price: menu.salePrice,
                        originalPrice: menu.costPrice,
                    });
                } else {
                    updateCount(menu.menuId, delta);
                }
            }

            return next;
        });

        if (delta > 0) {
            setShowToast(false);
            setTimeout(() => setShowToast(true), 0);
        }
    };

    useEffect(() => {
        if (pendingUpdate) {
                pendingUpdate();
            setPendingUpdate(null);
        }
    }, [pendingUpdate]);

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
                                originalPrice: menu.costPrice,
                                salePrice: menu.salePrice,
                                availableQuantity: menu.quantity,
                                count: menu.count,
                                salePercent: menu.salePercent,
                                category: menu.category,
                            }}
                            onCountChange = { delta => updateCountLocal(menu.menuId, delta) }
                        />
                    ))}     
                </div>               
            </div>
        </ScreenContainer>
    )
}