import "./MenuBox.scss";
import LOCATION from "../../../assets/main/storeLocation.svg";

export const MenuBox = () => {
    return (
        <div className = "menuBoxContainer">
            <img className = "menuImage" />
            <div className = "infoBox">
                <div className = "menuInfo">
                    <p className = "menuName">진미채볶음</p>
                    <div className = "storeInfo">
                        <img src = { LOCATION } />
                        <p>희망식당</p>
                    </div>
                </div>
                <div className = "priceInfo">
                    <p>1개</p>
                    <p>1500원</p>
                </div>
            </div>
        </div>
    )
}