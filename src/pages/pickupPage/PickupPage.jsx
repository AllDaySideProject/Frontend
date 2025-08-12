import { useState } from "react";
import { HeaderArrow } from "../../components/HeaderArrow";
import { PickupIntro } from "./components/PickupIntro";
import { PickupState } from "./components/PickupState";

export const PickupPage = () => {
    const [view, setView] = useState("location");

    return (
        <>
            <HeaderArrow />
            <PickupIntro view = { view } />
            <PickupState view = { view } onChange = { setView } />
        </> 
    )
}