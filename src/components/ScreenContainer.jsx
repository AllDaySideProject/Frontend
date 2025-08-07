import "./ScreenContainer.scss";

const ScreenContainer = ({ children }) => {
    return (
    <div className="screenContainer">
      <div className="screenContent">{children}</div>
    </div>
    )
}

export default ScreenContainer; 