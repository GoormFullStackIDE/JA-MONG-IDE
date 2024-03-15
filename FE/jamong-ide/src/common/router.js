import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main';
import SignUp from '../signup/signup';
import LoginPage from '../login/login';
import FindPasswordPage from '../find/findfassword';
import FindIdPage from '../find/findid';
import Mainpage from '../main/mainpage';

// import ProfileEditPage from '../main/ProfileEditpage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/findpassword" element={<FindPasswordPage />} />
      <Route path="/findid" element={<FindIdPage />} />
      {/* <Route path="/profile" element={<ProfileEditPage />} /> */}
    </Routes>
  );
}
