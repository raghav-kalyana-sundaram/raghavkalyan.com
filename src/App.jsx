import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ContentListPage from './pages/ContentListPage';
import ContentDetailPage from './pages/ContentDetailPage';
import CoachingPage from './pages/CoachingPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-light-bg">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/articles" element={<ContentListPage contentType="articles" />} />
            <Route path="/articles/:slug" element={<ContentDetailPage contentType="articles" />} />

            <Route path="/projects" element={<ContentListPage contentType="projects" />} />
            <Route path="/projects/:slug" element={<ContentDetailPage contentType="projects" />} />

            <Route path="/notes" element={<ContentListPage contentType="notes" />} />
            <Route path="/notes/:slug" element={<ContentDetailPage contentType="notes" />} />

            <Route path="/videos" element={<ContentListPage contentType="videos" />} />
            <Route path="/videos/:slug" element={<ContentDetailPage contentType="videos" />} />

            <Route path="/coaching" element={<CoachingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
