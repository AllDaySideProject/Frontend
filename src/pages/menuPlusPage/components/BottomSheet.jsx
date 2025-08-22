import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer";
import { SheetBox } from "./SheetBox";
import { useMenu } from "../../../components/MenuContext";
import { useEffect, useRef, useState } from "react";
import { mapMenuListGetApi } from "../../../api/map/mapMenuListGetApi";

export const BottomSheet = ({
  height, // 바텀 시트 높이
  setHeight, // 높이 변경 함수
  storeId, // 선택한 가게 id
  setStoreId, // 가게 선택 해제 함수
  stores, // 가게 목록
  setShowToast, // 토스트 노출 여부 상태
  setToastMessage, // 토스트 메시지 상태
  categoryLabels, // 카테고리 라벨 매핑
  userPos, // 사용자 위치
  setStoreDetail, // 부모 상태에 가게 정보 저장
  setRouteCoords // 경로 좌표
}) => {
  const { menus, addMenu, updateCount, replaceMenus } = useMenu(); // 전역 상태
  const store = stores.find((s) => s.id === storeId); // 선택된 가게 정보

  const [storeDetail, setLocalStoreDetail] = useState(null); // 로컬 가게 정보

  // 메뉴 조회
  useEffect(() => {
    if (!storeId || !userPos) return;

    const fetchMenus = async () => {
      try {
        const data = await mapMenuListGetApi(storeId, userPos.lat, userPos.lng);
        setLocalStoreDetail(data); // 로컬 상태 업데이트
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

  const [pendingUpdate, setPendingUpdate] = useState(null); // 수량 변경

  const updateCountLocal = (menu, delta) => {
    const added = menus.find(m => m.menuId === menu.menuId);
    const currentCount = added?.count ?? 0; 

    if (delta > 0) { // 추가 동작
            
        if (currentCount >= menu.quantity) { // 재고 조회
            setToastMessage("재고를 초과했어요.");
            setShowToast(false);
            setTimeout(() => setShowToast(true), 0);
            return;
        }

        if (currentCount === 0) { // 장바구니에 없는 메뉴 새로 추가
            addMenu({
                ...menu,
                id: menu.menuId,
                storeName: storeDetail?.name,
                price: menu.costPrice,
                originalPrice: menu.salePrice,
            });
        } else {
            updateCount(menu.menuId, delta); // 이미 담긴 메뉴 수량 변경
        }

        setToastMessage("내 밥상에 추가되었어요.");
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
      {height > 0 && (
        <div
          className="bottomSheetBackground"
          onClick={() => {
            setHeight(0);
            setStoreId(null);
            setRouteCoords([]);
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