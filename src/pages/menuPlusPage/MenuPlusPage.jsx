import "./MenuPlusPage.scss";
import MenuPlusMap from "./components/MenuPlusMap"

export const MenuPlusPage = () => {
    return (
        <div className = "mapBg">
            <div className = "mapInner">
                <MenuPlusMap />
            </div>
        </div>
    )
}
