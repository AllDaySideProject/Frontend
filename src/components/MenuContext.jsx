import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menus, setMenus] = useState([]); // 메뉴 목록 전역 상태

    const addMenu = (menu) => { // 메뉴 추가
        setMenus(prev => [...prev, { id: Date.now(), ...menu }]);
    };

    const removeMenu = (id) => { // 메뉴 제거
        setMenus(prev => prev.filter(m => m.id !== id));
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