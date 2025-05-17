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
        <Route path="/side" element={<SidePage />} />
        <Route path="/api" element={<ApiTestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:category" element={<NoticePage />} />
        <Route path="/about/location" element={<Location />} /> // 찾아오시는 길
        <Route path="/about/professor" element={<ProfessorPage />} /> // 교수진
        <Route path="/about" element={<CollegeMajorPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board-posts/write" element={<BoardWritePage />} />
        <Route path="/board-posts/:category" element={<BoardDetailPage />} />
        <Route path="/college-major" element={<CollegeMajorPage />} /> // 학부소개
        <Route path="/departments/computer" element={<CollegeMajorPage />} /> // 컴퓨터학부
        <Route path="/departments/ict" element={<CollegeMajorPage />} /> // 정보통신학부
        <Route path="/departments/data" element={<CollegeMajorPage />} /> // 데이터과학부
        <Route path="/departments/cloud" element={<CollegeMajorPage />} /> // 클라우드융복합 /about
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
