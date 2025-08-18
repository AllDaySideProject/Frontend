import ReactDOM from 'react-dom/client';
import App from './App';
import { MenuProvider } from './components/MenuContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <MenuProvider>
    <App />
  </MenuProvider>
);