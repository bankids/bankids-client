import { Routes, Route } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';

function MypageRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <Mypage />
          </BackgroundTemplate>
        }
      />
    </Routes>
  );
}

export default MypageRouter;
