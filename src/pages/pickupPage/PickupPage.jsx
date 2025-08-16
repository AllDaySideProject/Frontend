import { useState } from "react";
import { HeaderArrow } from "../../components/HeaderArrow";
import { PickupIntro } from "./components/PickupIntro";
import { PickupState } from "./components/PickupState";
import { Code } from "./components/Code";
import { Location } from "./components/Location";

export const PickupPage = () => {
    const [phase, setPhase] = useState("check");


    const handlePhaseChange = (next) => {
        if (phase === "check" && next === "pickup") {
        setPhase("step"); // 중간 step
        setTimeout(() => setPhase("pickup"), 500);
        } else {
        setPhase(next);
        }
    };

    return (
        <>
            <HeaderArrow />
            <PickupIntro phase = { phase } />
            <PickupState phase = { phase } onChange = { handlePhaseChange } />

            { phase === "check" && <Location /> }
            { phase === "pickup" && <Code /> }     
        </> 
    )
}