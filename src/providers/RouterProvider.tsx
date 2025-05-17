import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApiTestPage from '@/pages/ApiTestPage';
import LoginPage from '@/pages/LoginPage';
import SidePage from '@/pages/SidePage';
import HomePage from '../pages/HomePage';
import Location from '../pages/Location';
import NoticePage from '../pages/NoticePage';
import NoticeDetailPage from '../pages/NoticeDetailPage';
import BoardPage from '../pages/BoardPage';
import BoardWritePage from '../pages/BoardWritePage';
import BoardDetailPage from '../pages/BoardDetailPage';
import ProfessorPage  from '../pages/ProfessorPage';
import CollegeMajorPage from '@/pages/CollegeMajorPage';

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/side" element={<SidePage />} />
        <Route path="/api" element={<ApiTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/location" element={<Location />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board-posts/write" element={<BoardWritePage />} />
        <Route path="/board-posts/:id" element={<BoardDetailPage />} />
        <Route path="/professor" element={<ProfessorPage />} />
        <Route path="/college-major" element={<CollegeMajorPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
