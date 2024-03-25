import { Routes, Route, BrowserRouter } from 'react-router-dom';
import IDEpage from '../pages/IDEpage/IDEpage';

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<IDEpage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
