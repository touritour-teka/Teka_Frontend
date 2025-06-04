import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatPage from './pages/chat/page';
import SettingPage from './pages/setting/page';
import MapPage from './pages/map/page';
import EnterPage from './pages/enter/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:chatroomUuid" element={<EnterPage />} />
        <Route path="/chat/:chatroomUuid" element={<ChatPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
