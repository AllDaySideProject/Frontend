import { useState } from "react";
import { Header } from "../mainPage/components/Header";
import { ButtonRow } from "./components/ButtonRow";
import { MenuEdit } from "./components/MenuEdit";
import { Modal } from "../../components/Modal";

export const MainMenuPage = () => {
    const [mode, setMode] = useState("normal"); // 모드 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 여는 상태 추가

    const [items, setItems] = useState([
        { id: 1, name: "진미채볶음", store: "희망식당", count: 1, price: 4500 },
        { id: 2, name: "멸치볶음", store: "우진이네 밥상", count: 2, price: 5500 },
    ]);

    const [selectedIds, setSelectedIds] = useState(new Set()); // 삭제 모드에서 선택된 메뉴 id 저장

    const toggleSelect = (id) => {
        if (mode !== "delete") return;
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
        return next;
        });
    };

    const handleDeleteClick = () => {
        if (selectedIds.size === 0) return; // 메뉴 선택하지 않으면 기능 없음
        console.log("삭제할 메뉴 ID:", Array.from(selectedIds)); // 선택한 메뉴 콘솔 메시지
        setIsModalOpen(true);
        console.log("삭제 모달 열기");
    };

    return (
        <>
            <Header />  
            <MenuEdit 
                mode = { mode }
                setMode = { setMode } 
                items = { items }             
                selectedIds = { selectedIds } // 선택된 메뉴 판단
                toggleSelect = { toggleSelect }
            />
            <ButtonRow 
                mode = { mode }
                setMode = { setMode } 
                onDeleteClick = { handleDeleteClick } // 삭제 기능 콘솔
                selectedCount = { selectedIds.size } // 선택 개수 판단 > 0이면 삭제하기 버튼 비활성화
            />

            { isModalOpen && (
                <Modal 
                    modalText = "선택한 메뉴를 삭제하겠습니까?"
                    leftButtonText = "취소"
                    rightButtonText = "삭제하기"
                />
            )}
        </>
    )
}