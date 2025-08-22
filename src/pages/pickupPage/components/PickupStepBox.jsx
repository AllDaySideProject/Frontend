import "./PickupStepBox.scss";

export const PickupStepBox = ({ stepText, active, onClick }) => {
    return (
        <div 
            className = { `stepContainer ${ active ? "active" : "" }` }
            onClick = { onClick } // 클릭 시 상위 컴포넌트에 단계 변경 알림
        >
            <p>{ stepText }</p>
        </div>
    )
}