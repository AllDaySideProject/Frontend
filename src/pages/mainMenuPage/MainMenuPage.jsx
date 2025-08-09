import { useState } from "react";
import { Header } from "../mainPage/components/Header";
import { ButtonRow } from "./components/ButtonRow";
import { MenuEdit } from "./components/MenuEdit";

export const MainMenuPage = () => {
    const [mode, setMode] = useState("normal"); // 모드 상태 추가

    const [items, setItems] = useState([
        { id: 1, name: "진미채볶음", store: "희망식당", count: 1, price: "4,500" },
        { id: 2, name: "멸치볶음", store: "우진이네 밥상", count: 1, price: "5,500" },
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
        </>
    )
}