import { useEffect, useState } from "react";
import "./Toast.scss";

export const Toast = ({ duration = 1000, onClose, toastText }) => {
    const [visible, setVisible] = useState(true); // 표시 여부

    useEffect(() => {
        if (!toastText) return;

        setVisible(true); // 새 메시지 들어오면 다시 보이게
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [toastText, duration]); // 메시지가 바뀔 때마다 다시 실행


    if (!visible) return null;

    return (
        <div className = "toast">
            <p className = "toastMessage">{ toastText }</p>
        </div>
    )
}