import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main';

import SignUp from '../signup/signup';
import LoginPage from '../login/login';
import FindPasswordPage from '../find/findfassword';
import FindIdPage from '../find/findid';
import Container from '../main/container';
import IDEpage from '../pages/IDEpage/IDEpage';
import ProfilePage from '../component/profileEdit';

export default function Router() {
  return (
    <Routes>

      <Route path="/" element={<Main />} />
      <Route path="/container" element={<Container />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/findpassword" element={<FindPasswordPage />} />
      <Route path="/findid" element={<FindIdPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/idepage/*" element={<IDEpage />}>
        <Route path=":id" element={<IDEpage />} />
      </Route>

    </Routes>
  );
}
