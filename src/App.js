import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Task from './Composant/task';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<Task />} />      </Routes>
    </Router>
  );
}

export default App;
