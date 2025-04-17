import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/login/page';
import SignupPage from './pages/signup/page';
import ManagePage from './pages/manage/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/manage" element={<ManagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
