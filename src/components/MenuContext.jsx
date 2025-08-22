import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext(); // 메뉴 전역 상태 관리 컨텍스트 생성

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState(() => { // 로컬 스토리지에서 초기 메뉴 데이터 불러오기
        const stored = localStorage.getItem("menus"); // 로컬 스토리지에서 메뉴 데이터 가져오기
        return stored ? JSON.parse(stored) : []; // 없으면 빈 배열
    });

    useEffect(() => { // 메뉴 데이터가 변경될 때마다 로컬 스토리지에 저장 (새로고침 시에도 유지)
        localStorage.setItem("menus", JSON.stringify(menus));
    }, [menus]);

    const addMenu = (menu) => { // 메뉴 추가
        setMenus(prev => {
            const exists = prev.find(m => m.menuId === menu.menuId); // 이미 담긴 메뉴인지 확인

            if (exists) { // 이미 담긴 메뉴라면
                if (exists.count < exists.maxQuantity) { // 재고에 따른 한도 확인
                    return prev.map((m) =>
                        m.menuId === menu.menuId
                            ? { ...m, count: m.count + 1 } // 수량 + 1
                            : m
                    );
                }
                return prev; // 더 이상 추가 불가
            }

            // 처음 담을 때만 추가됨 (기본 수량 1)
            return [...prev, { ...menu, count: 1, maxQuantity: menu.quantity }];
        });
    };


    const updateCount = (menuId, delta) => { // 메뉴 수량 변경
        setMenus((prev) =>
            prev
                .map((m) => {
                    if (m.menuId !== menuId) return m; // 다른 메뉴는 그대로
                    let newCount = m.count + delta; // 수량 조정
                    if (newCount > m.maxQuantity) newCount = m.maxQuantity;
                    return { ...m, count: newCount };
                })
                .filter(m => m.count > 0) // 0이면 아예 제거
        );
    };


    const removeMenu = (menuId) => { // 특정 메뉴 제거
        setMenus(prev => prev.filter(m => m.menuId !== menuId));
    };

    const clearMenus = () => { // 픽업 완료 후 장바구니 비우기
        setMenus([]);
        localStorage.removeItem("menus"); // 로컬 스토리지에서 메뉴 데이터 제거
    };

    const replaceMenus = (newMenus) => { // 재고 갱신
        setMenus(prev =>
            newMenus.map(newM => {
                const old = prev.find(m => m.menuId === newM.menuId);
                return old ? { ...old, maxQuantity: newM.quantity } : null; // 이전 count 유지, 없으면 기본 1
            })
        );
    };

    return (
        <MenuContext.Provider value = {{ menus, addMenu, updateCount, removeMenu, clearMenus, replaceMenus }}> 
            { children }
        </MenuContext.Provider>
    )
}

export const useMenu = () => { // 전역 상태 관리 사용 위한 커스텀 훅
    return useContext(MenuContext);
}