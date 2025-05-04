import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Scene from './components/scene';
import BMW23 from './components/projects/comissioned/bmw23';
import ISH23 from './components/projects/comissioned/ish23';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Scene />} />
        <Route path="/projects/bmw23" element={<BMW23 />} />
        <Route path="/projects/ish23" element={<ISH23 />} />
      </Route>
    </Routes>
  );
}

export default App;
