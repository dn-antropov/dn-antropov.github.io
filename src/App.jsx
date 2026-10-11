import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Scene from './components/scene';
import ProjectPage from './components/projects/project_page';
import ScrollToTop from './components/scroll_to_top';
import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Scene />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
