import "./index.scss";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { MainPage } from "./pages/mainPage/MainPage";
import { MainMenuPage } from "./pages/mainMenuPage/MainMenuPage";
import { LocationPermissionProvider } from "./components/LocationPermissionContext";
import { PickupPage } from "./pages/pickupPage/PickupPage";
import { PickupCompletePage } from "./pages/pickupPage/PickupCompletePage";
import { TipsPage } from "./pages/tipPage/TipsPage";

function App() {
  return (
    <LocationPermissionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main/menu" element={<MainMenuPage />} />
          <Route path="/pickup" element={<PickupPage />} />
          <Route path="/pickup/complete" element={<PickupCompletePage />} />
          <Route path="/tips" element={<TipsPage />} />
        </Routes>    
      </BrowserRouter>      
    </LocationPermissionProvider>
  );
}

export default App;