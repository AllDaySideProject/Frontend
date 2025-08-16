import "./ScreenContainer.scss";

const ScreenContainer = ({ children, bgColor = "#FAFAFA", padding = "2rem" }) => {
    return (

    <div className="screenContainer">
      <div 
        className="screenContent"
        style = {{ backgroundColor: bgColor, paddingLeft: padding, paddingRight: padding }}
      >{children}
      </div>
    </div>
    )
}

export default ScreenContainer; 