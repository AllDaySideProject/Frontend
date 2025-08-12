import "./Header.scss";

import LOGO from "../../../assets/logo.svg";
import LOCATION_ON from "../../../assets/main/location.svg";
import LOCATION_OFF from "../../../assets/main/offLocation.svg"

import ScreenContainer from "../../../components/ScreenContainer";
import { useLocationPermission } from "../../../components/LocationPermissionContext";

export const Header = () => {
    const { agreed, address, requestLocation } = useLocationPermission();

    return (
        <ScreenContainer>
            <div className = "HeaderContainer">
                <div className = "HeaderLeft">
                    <img src = { LOGO } alt = "잔반 플러팅 로고" />
                    <p className = "logoName">잔반플러팅</p>
                </div>
                <div className = "HeaderRight">
                    <img 
                        className = { agreed ? "locationIcon on" : "locationIcon off" }
                        src = { agreed ? LOCATION_ON : LOCATION_OFF } 
                        onClick = { requestLocation } // 아이콘 클릭 시 재요청
                        alt = { agreed ? "위치 동의" : "위치 미동의" }
                    />
                    <p>{ agreed ? address : "" }</p>
                </div>                
            </div>
        </ScreenContainer>
    )
}