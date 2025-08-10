import "./index.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage/MainPage";
import { MainMenuPage } from "./pages/mainMenuPage/MainMenuPage";
import { LocationPermissionProvider } from "./components/LocationPermissionContext";

function App() {
  return (
    <LocationPermissionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main/menu" element={<MainMenuPage />} />
        </Routes>    
      </BrowserRouter>      
    </LocationPermissionProvider>
  );
}

export default App;
