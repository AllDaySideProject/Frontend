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

    const addMenu = (menu) => { // 메뉴 추가
        setMenus(prev => [...prev, menu]);
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

    return (
        <MenuContext.Provider value = {{ menus, addMenu, updateCount, removeMenu, clearMenus }}> 
            { children }
        </MenuContext.Provider>
    )
}

export const useMenu = () => {
    return useContext(MenuContext);
}