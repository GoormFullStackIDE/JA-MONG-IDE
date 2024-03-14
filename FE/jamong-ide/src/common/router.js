import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main';

export default function Router() {
  return (
    <Routes>
      <Route path="/jamong" element={<Main />} />
    </Routes>
  );
}
