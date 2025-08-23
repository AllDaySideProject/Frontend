import "./MainMenuPage.scss";

import { useEffect, useState } from "react";
import { Header } from "../mainPage/components/Header";
import { ButtonRow } from "./components/ButtonRow";
import { MenuEdit } from "./components/MenuEdit";
import { Modal } from "../../components/Modal";
import { useMenu } from "../../components/MenuContext";
import { pickupDetailPostApi } from "../../api/pickup/pickupDetailPostApi";
import { pickupReservePostApi } from "../../api/pickup/pickupReservePostApi";
import { useNavigate } from "react-router-dom";

export const MainMenuPage = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState("normal"); // 모드 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 여는 상태 추가
    const [selectedIds, setSelectedIds] = useState(new Set()); // 삭제 모드에서 선택된 메뉴 id 저장

    const { menus, replaceMenus, removeMenu } = useMenu(); // 전역 메뉴 상태 관리

    useEffect(() => { // 담긴 메뉴 id 기반으로 서버에서 상세 정보 가져오기
        const fetchMenus = async () => {
            const menuIds = menus.map(m => m.menuId); // 전역 상태에 담긴 메뉴 id 배열
            if (menuIds.length === 0) return;

            try {
                const data = await pickupDetailPostApi(menuIds);
                replaceMenus(data); // 응답값을 전역 상태에 저장 (storeName, salePrice 등 업데이트됨)
            } catch (err) {
                console.error("메뉴 상세 조회 실패:", err);
            }
        };
        fetchMenus();
    }, []);

    useEffect(() => {
        if (mode !== "delete") setSelectedIds(new Set()); // 모드 변경 시 선택 초기화
    }, [mode]);

    const toggleSelect = (menuId) => {
        if (mode !== "delete") return; // 삭제 모드에서만 선택 가능
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(menuId) ? next.delete(menuId) : next.add(menuId);
        return next;
        });
    };

    const handleDeleteClick = () => { // 삭제하기 버튼 클릭 시 모달 열기
        if (selectedIds.size === 0) return; // 메뉴 선택하지 않으면 기능 없음
        console.log("selectedIds:", Array.from(selectedIds));
        console.log("menus in context:", menus);
        console.log("삭제할 메뉴 ID:", Array.from(selectedIds)); // 선택한 메뉴 콘솔 메시지
        setIsModalOpen(true);
        console.log("삭제 모달 열기");
    };

    const onRightBtnClick = () => { // 모달 삭제 실행
        Array.from(selectedIds).forEach(id => removeMenu(id));

        setSelectedIds(new Set()); // 선택 상태 초기화
        setMode("normal"); // 모드 초기화
        setIsModalOpen(false); // 모달 닫기
        console.log("선택한 메뉴 삭제 완료");
    }

    const handleReserveClick = () => { // 예약하기 버튼 클릭 시 모달 열기
        if (menus.length === 0) {
            console.warn("예약할 메뉴가 없음");
            return;
        }
        setIsModalOpen(true);
    };

    const confirmReserve = async () => { // 모달 예약 실행
        try {
            const items = menus.map(m => ({
                menuId: m.menuId, count: m.count
            }));

            const reserveRes = await pickupReservePostApi(items);
            console.log("예약 응답: ", reserveRes);

            setIsModalOpen(false); // 모달 닫기
            navigate("/pickup", { state: { 
                ...reserveRes,
                menus: menus.map(m => m.name) 
            }}); // 예약 완료 후 이동
        } catch (error) {
            console.error("예약 실패:", error);
        }
    };

    return (
        <div className = "mainMenuBg">
        <div className = "mainMenuWrapper">
            <Header />  
            <MenuEdit 
                mode = { mode }
                setMode = { setMode } 
                selectedIds = { selectedIds } // 선택된 메뉴 판단
                toggleSelect = { toggleSelect }
                menuIds = { menus.map(m => m.menuId) }
            />
            <ButtonRow 
                paddingTop = "1.06rem"
                paddingBottom = "2rem"
                mode = { mode }
                setMode = { setMode } 
                onDeleteClick = { handleDeleteClick } // 삭제 기능 콘솔
                selectedCount = { selectedIds.size } // 선택 개수 판단 > 0이면 삭제하기 버튼 비활성화
                onReserveClick = { handleReserveClick }
            />

            { isModalOpen && (
                <div className="modalOverLay">
                    <Modal 
                        modalText={mode === "delete" 
                            ? "선택한 메뉴를 삭제하겠습니까?" 
                            : "픽업 예약을 진행하시겠습니까?" }
                        leftButtonText = "취소"
                        onLeftClick = { () => setIsModalOpen(false) }
                        rightButtonText = { mode === "delete" ? "삭제하기" : "확인" }
                        onRightClick = { mode === "delete" 
                            ? onRightBtnClick // 삭제 함수
                            : confirmReserve // 예약 함수
                        }
                    />                    
                </div>
            )}
        </div>
        </div>
    )
}