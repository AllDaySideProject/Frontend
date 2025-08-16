import { useEffect, useState } from "react";
import "./Toast.scss";

export const Toast = ({ duration = 1000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className = "toast">
            <p className = "toastMessage">내 밥상에 추가되었어요.</p>
        </div>
    )
}