import React from "react";
import { MenuSelection } from "./pages/menuSelection/MenuSelection";
import { AiSuggestion } from "./pages/aiSuggestion/AiSuggestion";
console.log(AiSuggestion);
function App() {
  return (
    <div className="App">
      {/* <MenuSelection/> */}
      <AiSuggestion/>
    </div>
  );
}

export default App;
