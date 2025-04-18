import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/enter/page';
import ChatPage from './pages/chat/page';
import SettingPage from './pages/setting/page';
import MapPage from './pages/map/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
