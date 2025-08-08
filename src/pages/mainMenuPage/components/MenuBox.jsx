import "./MenuBox.scss";
import LOCATION from "../../../assets/main/storeLocation.svg";

export const MenuBox = ({ menuName, storeName, count, price }) => {
    return (
        <div className = "menuBoxContainer">
            <img className = "menuImage" />
            <div className = "infoBox">
                <div className = "menuInfo">
                    <p className = "menuName">{ menuName }</p>
                    <div className = "storeInfo">
                        <img src = { LOCATION } />
                        <p>{ storeName }</p>
                    </div>
                </div>
                <div className = "priceInfo">
                    <p>{ count }개</p>
                    <p>{ price }원</p>
                </div>
            </div>
        </div>
    )
}