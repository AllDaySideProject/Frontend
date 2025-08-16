import "./DistanceBox.scss"
import DIS_LOCATION from "../../assets/map/distanceLocation.svg";

export const DistanceBox = ({ name, distance }) => {
    const text = distance < 1000 ? `${ Math.round(distance) }m` : `${ (distance / 1000).toFixed(1) }km`; 
    return (
        <div className = "distanceBox">
            <img src = { DIS_LOCATION } />
            <p>{ name } ({ text })</p>
        </div>
    )
}