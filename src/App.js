import { useState } from 'react';
import './App.css';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Mainpage from './page/Mainpage';
import Loadingpage from './page/Loadingpage';
import Loginpage from './page/Loginpage';
import Navbar from './component/Navbar';
import Scheduler from './page/Scheduler';
import StudyRoom from './page/StudyRoom';
import Ranking from './page/Ranking';
import MyPage from './page/MyPage';
import Signup from './page/signup';

function App() {
  const [authenticate, setAuthenticate] = useState(false)
  const PrivateRoute = () => {
    return authenticate == true ? <Navigate to="/loading" /> : <Navigate to="/login" />
  }

  const location = useLocation()
  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute />} />
        <Route path='/login' element={<Loginpage setAuthenticate={setAuthenticate} />} />
        <Route path='/loading' element={<Loadingpage />} />
        <Route path="/main" element={<Mainpage />} />
        <Route path='/scheduler' element={<Scheduler />} />
        <Route path='/studyroom/:subject_id' element={<StudyRoom />} />
        <Route path='/studyroom' element={<StudyRoom />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      {location.pathname === '/main' && <Navbar />}
      {location.pathname === '/scheduler' && <Navbar />}
      {location.pathname === '/studyroom/:subject_id' && <Navbar />}
      {location.pathname === '/studyroom' && <Navbar />}
      {location.pathname === '/ranking' && <Navbar />}
      {location.pathname === '/mypage' && <Navbar />}
    </div>
  );
}
export default App;
