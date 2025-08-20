import { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState(() => { // 로컬 스토리지에서 초기 메뉴 데이터 불러오기
        const stored = localStorage.getItem("menus"); // 로컬 스토리지에서 메뉴 데이터 가져오기
        return stored ? JSON.parse(stored) : []; // 없으면 빈 배열
    });

    useEffect(() => { // 메뉴 데이터가 변경될 때마다 로컬 스토리지에 저장
        localStorage.setItem("menus", JSON.stringify(menus));
    }, [menus]);

    const addMenu = (menu) => {
        setMenus(prev => {
            const exists = prev.find(m => m.menuId === menu.menuId);

            if (exists) {
                // 수량 한도 체크
                if (exists.count < exists.maxQuantity) {
                    return prev.map((m) =>
                        m.menuId === menu.menuId
                            ? { ...m, count: m.count + 1 }
                            : m
                    );
                }
                return prev; // 더 이상 추가 불가
            }

            // 처음 담을 때만 추가됨 (기본 수량 1)
            return [...prev, { ...menu, count: 1, maxQuantity: menu.quantity }];
        });
    };


    const updateCount = (menuId, delta) => {
        setMenus((prev) =>
            prev
                .map((m) => {
                    if (m.menuId !== menuId) return m;
                    let newCount = m.count + delta;
                    if (newCount > m.maxQuantity) newCount = m.maxQuantity;
                    return { ...m, count: newCount };
                })
                .filter(m => m.count > 0) // 0이면 아예 제거
        );
    };


    const removeMenu = (menuId) => { // 메뉴 제거
        setMenus(prev => prev.filter(m => m.menuId !== menuId));
    };

    const clearMenus = () => {
        setMenus([]);
        localStorage.removeItem("menus"); // 로컬 스토리지에서 메뉴 데이터 제거
    };

    const replaceMenus = (newMenus) => {
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

export const useMenu = () => {
    return useContext(MenuContext);
}