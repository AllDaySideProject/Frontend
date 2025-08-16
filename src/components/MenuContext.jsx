import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState([]); // 메뉴 목록 전역 상태

    const addMenu = (menu) => { // 메뉴 추가
        setMenus(prev => [...prev, menu]);
    };

    const removeMenu = (menu) => { // 메뉴 제거
        setMenus(prev => prev.filter(m => m !== menu));
    };

    return (
        <MenuContext.Provider value = {{ menus, addMenu, removeMenu }} >
            { children }
        </MenuContext.Provider>
    )
}

export const useMenu = () => {
    return useContext(MenuContext);
}