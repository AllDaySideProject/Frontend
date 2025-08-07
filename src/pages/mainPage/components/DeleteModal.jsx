import "./DeleteModal.scss";

export const DeleteModal = () => {
    return (
        <div className = "modalContainer">
            <p className = "modalText">선택하신 메뉴를 삭제하겠습니까?</p>
            <div className = "buttonContainer">
                <div className = "cancelButton">
                    <p>취소</p>
                </div>
                <div className = "deleteButton">
                    <p>삭제하기</p>
                </div>
            </div>
        </div>
    )
}