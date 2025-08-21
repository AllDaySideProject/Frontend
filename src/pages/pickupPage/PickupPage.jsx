import "./PickupPage.scss";

import { useState } from "react";
import { PickupIntro } from "./components/PickupIntro";
import { PickupState } from "./components/PickupState";
import { Code } from "./components/Code";
import { Location } from "./components/Location";
import { PickupHeader } from "./components/PickupHeader";

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

    const isCodePhase = phase !== "check"; 

    return (
        <div className={`pickupPage ${isCodePhase ? "codeMode" : ""}`}>
            <PickupHeader />
            <PickupIntro phase = { phase } />
            <PickupState phase = { phase } onChange = { handlePhaseChange } />

            
            { (phase === "check") ? 
            
                ( <Location /> ) : (
                
                <div className="pickupContent">
                    <Code /> 
                </div>
                )}
        </div>
    )
}