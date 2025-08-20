import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { SheetBox } from "./SheetBox";
import { useMenu } from "../../../components/MenuContext";
import { useEffect, useRef, useState } from "react";
import { mapMenuListGetApi } from "../../../api/map/mapMenuListGetApi";

export const BottomSheet = ({
  height,
  setHeight,
  storeId,
  setStoreId,
  stores,
  setShowToast,
  categoryLabels,
  userPos,
  setStoreDetail,
}) => {
  const { menus, addMenu, updateCount, replaceMenus } = useMenu(); // 전역 상태
  const store = stores.find((s) => s.id === storeId); // 선택된 가게 정보

  const [storeDetail, setLocalStoreDetail] = useState(null);

  // 메뉴 조회
  useEffect(() => {
    if (!storeId || !userPos) return;

    const fetchMenus = async () => {
      try {
        const data = await mapMenuListGetApi(storeId, userPos.lat, userPos.lng);
        setLocalStoreDetail(data);
        setStoreDetail(data);
        // replaceMenus(data.menus || []);
      } catch (error) {
        console.error("메뉴 조회 실패", error);
      }
    };

    fetchMenus();
  }, [storeId, userPos]);

  // 드래그 관련 상태
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleDragStart = (e) => {
    startY.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeight.current = height;

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDragMove = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = startY.current - currentY; // 위로 올리면 양수
    let newHeight = startHeight.current + deltaY / 16;

    // 최소 24.63rem, 최대 40.19rem
    newHeight = Math.max(24.63, Math.min(newHeight, 40.19));
    setHeight(newHeight);
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragMove);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDragMove);
    document.removeEventListener("touchend", handleDragEnd);
  };

  // 수량 변경
  const [pendingUpdate, setPendingUpdate] = useState(null);

  const updateCountLocal = (menu, delta) => {
    const added = menus.find(m => m.menuId === menu.menuId);
    const currentCount = added?.count ?? 0; 

    if (delta > 0) {
      if (currentCount === 0) {
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
      setShowToast(false);
      setTimeout(() => setShowToast(true), 0);
    } else {
      updateCount(menu.menuId, delta);
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
      {height > 0 && (
        <div
          className="bottomSheetBackground"
          onClick={() => {
            setHeight(0);
            setStoreId(null);
          }}
        />
      )}

      <div
        className="bottomSheet"
        style={{ height: `${height}rem` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 그랩바 */}
        <div
          className="bottomSheetHeader"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="grabber" />
        </div>

        {/* 가게 정보 */}
        <div className="sheetStoreInfo">
          <p className="sheetStoreName">{storeDetail?.name}</p>
          <p className="sheetStoreType">
            {categoryLabels[storeDetail?.category]}
          </p>
        </div>

        {/* 메뉴 리스트 */}
        <div className="sheetBoxContainer">
          { storeDetail?.menus?.map((menu) => {
            const added = menus.find(m => m.menuId === menu.menuId);
            return (
                <SheetBox
                key={menu.menuId}
                menu={{
                    id: menu.menuId,
                    name: menu.name,
                    originalPrice: menu.costPrice,
                    salePrice: menu.salePrice,
                    availableQuantity: menu.quantity,
                    count: added?.count ?? 0,
                    salePercent: menu.salePercent,
                    category: menu.category,
                }}
                onCountChange={(delta) => updateCountLocal(menu, delta)}
                />
            );
        })};
        </div>
      </div>
    </ScreenContainer>
  );
};