import "./DistanceBox.scss"
import DIS_LOCATION from "../../assets/map/distanceLocation.svg";

export const DistanceBox = () => {
    return (
        <div className = "distanceBox">
            <img src = { DIS_LOCATION } />
            <p>유진이네 밥상 (0.6km)</p>
        </div>
    )
}