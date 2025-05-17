import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ApiTestPage from '@/pages/ApiTestPage';
import CollegeMajorPage from '@/pages/CollegeMajorPage';
import LoginPage from '@/pages/LoginPage';
import SidePage from '@/pages/SidePage';
import BoardDetailPage from '../pages/BoardDetailPage';
import BoardPage from '../pages/BoardPage';
import BoardWritePage from '../pages/BoardWritePage';
import HomePage from '../pages/HomePage';
import Location from '../pages/Location';
import NoticeDetailPage from '../pages/NoticeDetailPage';
import NoticePage from '../pages/NoticePage';
import ProfessorPage from '../pages/ProfessorPage';

const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice/:category" element={<NoticePage />} />
        <Route path="/notice-detail/:id" element={<NoticeDetailPage />} />
        <Route path="/side" element={<SidePage />} />
        <Route path="/api" element={<ApiTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/about/location" element={<Location />} />
        <Route path="/about/professor" element={<ProfessorPage />} /> 
        <Route path="/about" element={<CollegeMajorPage />} />
        <Route path="/board/:categry" element={<BoardPage />} />
        <Route path="/board-posts/write" element={<BoardWritePage />} />
        <Route path="/board-posts/:id" element={<BoardDetailPage />} />
        <Route path="/college-major" element={<CollegeMajorPage />} /> 
        <Route path="/departments/computer" element={<CollegeMajorPage />} /> 
        <Route path="/departments/ict" element={<CollegeMajorPage />} /> 
        <Route path="/departments/data" element={<CollegeMajorPage />} />
        <Route path="/departments/cloud" element={<CollegeMajorPage />} /> 
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
