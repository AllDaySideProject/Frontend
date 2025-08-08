import { Header } from "../mainPage/components/Header";
import { ButtonRow } from "./components/ButtonRow";
import { MenuEdit } from "./components/MenuEdit";

export const MainMenuPage = () => {
    return (
        <>
            <Header />  
            <MenuEdit />
            <ButtonRow />
        </>
    )
}