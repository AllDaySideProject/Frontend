import { useState } from "react";
import { Header } from "../mainPage/components/Header";
import { ButtonRow } from "./components/ButtonRow";
import { MenuEdit } from "./components/MenuEdit";

export const MainMenuPage = () => {
    const [mode, setMode] = useState("normal"); // 모드 상태 추가

    return (
        <>
            <Header />  
            <MenuEdit mode = { mode } setMode = { setMode } />
            <ButtonRow mode = { mode } setMode = { setMode } />
        </>
    )
}