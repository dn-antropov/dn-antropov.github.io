import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Scene from './components/scene';
import ProjectPage from './components/projects/project_page';
import ScrollManager from './components/scroll_manager';

function App() {
  return (
    <>
      <ScrollManager />
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
