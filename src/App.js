import "./index.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>    
    </BrowserRouter>

  );
}

export default App;
