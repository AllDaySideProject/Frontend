import "./BottomSheet.scss";

import ScreenContainer from "../../../components/ScreenContainer"
import { SheetBox } from "./SheetBox"
import { useState } from "react";
import { Toast } from "./Toast";

export const BottomSheet = () => {
    const [menus, setMenus] = useState([
        { id: 1, name: "진미채볶음", originalPrice: 4500, price: 3600, count: 0 },
        { id: 2, name: "계란말이", originalPrice: 5000, price: 4000, count: 0 },
        { id: 3, name: "멸치볶음", originalPrice: 3000, price: 2500, count: 0 },
    ]);

    const [showToast, setShowToast] = useState(false);

    const updateCount = (id, delta) => {
        setMenus(prev =>
            prev.map(m =>
                m.id === id ? { ...m, count: Math.max(m.count + delta, 0) } : m
            )
        );

        if (delta > 0) {
            setShowToast(false);
            setTimeout(() => setShowToast(true), 0);
        }
    };

    return (
        <ScreenContainer>
            <div className = "bottomSheet">
                <div className = "bottomSheetHeader">
                    <div className = "grabber">
                        {/* 그랩 바 */}
                    </div>
                </div>
                <div className = "sheetStoreInfo">
                   <p className = "sheetStoreName">유진이네 밥상</p> 
                   <p className = "sheetStoreType">한식 전문점</p>
                </div>
                
                { menus.map(menu => (
                    <SheetBox
                    key = { menu.id }
                    menu = { menu }
                    onCountChange = { delta => updateCount(menu.id, delta) }
                    />
                ))}
            </div>


            { showToast && (
                <div className = "toastContainer">
                    <Toast
                        duration = { 2000 }
                        onClose = { () => setShowToast(false) }
                    />                    
                </div>
            )}
        </ScreenContainer>
    )
}