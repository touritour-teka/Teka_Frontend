import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login/page';
import SignupPage from './pages/signup/page';
import ManagePage from './pages/manage/page';
import RoomCreatePage from './pages/room/create/page';
import RoomDetailPage from './pages/room/[id]/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/room/create" element={<RoomCreatePage />} />
        <Route path='/room/:id' element={<RoomDetailPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
