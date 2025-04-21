import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login/page';
import SignupPage from './pages/signup/page';
import ManagePage from './pages/manage/page';
import RoomCreatePage from './pages/room/create/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/room/create" element={<RoomCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
