import "./ScreenContainer.scss";

const ScreenContainer = ({ children, bgColor = "#FAFAFA" }) => {
    return (

    <div className="screenContainer">
      <div 
        className="screenContent"
        style = {{ backgroundColor: bgColor }}
      >{children}
      </div>
    </div>
    )
}

export default ScreenContainer; 