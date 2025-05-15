import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApiTestPage from '@/pages/ApiTestPage';
import LoginPage from '@/pages/LoginPage';
import SidePage from '@/pages/SidePage';
import HomePage from '../pages/HomePage';
import Location from '../pages/Location';
import NoticePage from '../pages/NoticePage';

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/side" element={<SidePage />} />
        <Route path="/api" element={<ApiTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/location" element={<Location />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
