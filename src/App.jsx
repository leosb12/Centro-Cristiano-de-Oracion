import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MisionesPage from './pages/MisionesPage'
import AdoracionPage from './pages/ministerios/AdoracionPage'
import EscuelaNinosPage from './pages/ministerios/EscuelaNinosPage'
import HombresPage from './pages/ministerios/HombresPage'
import MujeresPage from './pages/ministerios/MujeresPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/misiones" element={<MisionesPage />} />
      <Route path="/ministerios/adoracion" element={<AdoracionPage />} />
      <Route path="/ministerios/escuela-de-ninos" element={<EscuelaNinosPage />} />
      <Route path="/ministerios/hombres-con-proposito" element={<HombresPage />} />
      <Route path="/ministerios/mujeres-con-proposito" element={<MujeresPage />} />
    </Routes>
  )
}

export default App
