import "./DistanceBox.scss"
import DIS_LOCATION from "../../assets/map/distanceLocation.svg";

export const DistanceBox = ({ name, distance }) => {
    return (
        <div className = "distanceBox">
            <img src = { DIS_LOCATION } />
            <p>{ name } ({ distance } km)</p>
        </div>
    )
}