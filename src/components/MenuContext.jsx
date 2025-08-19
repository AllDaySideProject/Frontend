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
            const exists = prev.find(m => m.id === menu.id);

            if (exists) {
            return prev.map(m =>
                m.id === menu.id
                ? { ...m, count: (m.count ?? 0) + 1 }
                : m
            );
        }

        return [...prev, { ...menu, count: menu.count ?? 1 }];
    });
    };


    const updateCount = (id, delta) => {
        setMenus(prev =>
        prev.map(m =>
            m.id === id
            ? { ...m, count: Math.max((m.count ?? 0) + delta, 0) }
            : m
    ))};

    const removeMenu = (id) => { // 메뉴 제거
        setMenus(prev => prev.filter(m => m.id !== id));
    };

    const clearMenus = () => {
        setMenus([]);
        localStorage.removeItem("menus"); // 로컬 스토리지에서 메뉴 데이터 제거
    };

    const replaceMenus = (newMenus) => {
        setMenus(prev =>
            newMenus.map(newM => {
                const old = prev.find(m => m.id === newM.id);
                return { ...newM, count: old?.count ?? 1 }; // 이전 count 유지, 없으면 기본 1
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