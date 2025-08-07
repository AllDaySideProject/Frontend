import "./ScreenContainer.scss";

const ScreenContainer = ({ children }) => {
    return (
        <div className="screenContainer">
            { children }
        </div>
    )
}

export default ScreenContainer;