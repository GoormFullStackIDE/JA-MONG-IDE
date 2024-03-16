import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main';
import Mainpage from '../component/mainpage';

export default function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Main />} /> */}
      <Route path="/mainpage" element={<Mainpage />} />
      <Route path="/profilepage" element={<Profilepage />} />


    </Routes>
  );
}
