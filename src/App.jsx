import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MisionesPage from './pages/MisionesPage'
import AdoracionPage from './pages/ministerios/AdoracionPage'
import EscuelaNinosPage from './pages/ministerios/EscuelaNinosPage'
import HombresPage from './pages/ministerios/HombresPage'
import MujeresPage from './pages/ministerios/MujeresPage'
import ServicioPrincipalPage from './pages/servicios/ServicioPrincipalPage'
import NocheOracionPage from './pages/servicios/NocheOracionPage'
import EstudioBiblicoPage from './pages/servicios/EstudioBiblicoPage'
import OracionAyunoPage from './pages/servicios/OracionAyunoPage'
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
      <Route path="/servicios/servicio-principal" element={<ServicioPrincipalPage />} />
      <Route path="/servicios/noche-de-oracion" element={<NocheOracionPage />} />
      <Route path="/servicios/estudio-biblico" element={<EstudioBiblicoPage />} />
      <Route path="/servicios/oracion-y-ayuno" element={<OracionAyunoPage />} />
    </Routes>
  )
}

export default App
