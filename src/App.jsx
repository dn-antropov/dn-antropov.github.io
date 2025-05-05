import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Scene from './components/scene';
import BMW23 from './components/projects/comissioned/bmw23';
import ISH23 from './components/projects/comissioned/ish23';
import GaussianDreams from './components/projects/private/gaussiandreams';
import ScrollToTop from './components/scroll_to_top';
import './App.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Scene />} />
          <Route path="/projects/bmw23" element={<BMW23 />} />
          <Route path="/projects/ish23" element={<ISH23 />} />
          <Route path="/projects/gaussiandreams" element={<GaussianDreams />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
