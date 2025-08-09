import "./MenuBox.scss";
import LOCATION from "../../../assets/main/storeLocation.svg";
import CHECKBOX from "../../../assets/main/checkbox.svg";

export const MenuBox = ({ mode = "normal", isSelected = false, onToggleSelect, menuName, storeName, count, price }) => {
    const isDelete = mode === "delete";

    if (isDelete) {
        return (
            <div className = "menuBoxContainer deleteMode">
                <img className = "menuImage" />
                <div className = "menuContainer">
                    <div className = "infoBox">
                        <div className = "menuInfo">
                            <p className = "priceText">{ price }원</p>
                            <p className = "section">l</p>
                            <div className = "priceInfo">
                                <p>{ menuName } { count }개</p>
                            </div>
                        </div>    
                        <div className = "storeInfo">
                            <img 
                                src = { LOCATION } 
                                className = "locationImage"
                            />
                            <p>{ storeName }</p>
                        </div>    
                    </div>
                    <img 
                        src = { CHECKBOX }
                        className = "checkBoxImage"
                    />       
                </div> 
            </div>

        )
    }

    return (
        <div className = "menuBoxContainer normalMode">
            <img className = "menuImage" />
            <div className = "infoBox">
                <div className = "menuInfo">
                    <p className = "menuName">{ menuName }</p>
                    <div className = "storeInfo">
                        <img 
                            src = { LOCATION } 
                            className = "locationImage"
                        />
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