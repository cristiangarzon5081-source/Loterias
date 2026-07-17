import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Lotteries from './pages/Lotteries';
import Chances from './pages/Chances';
import Baloto from './pages/Baloto';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loterias" element={<Lotteries />} />
          <Route path="/chances" element={<Chances />} />
          <Route path="/baloto" element={<Baloto />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Loterías Colombia</h3>
              <p className="text-gray-300">
                Tu fuente confiable para consultar resultados de loterías, chances y Baloto en tiempo real.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="/loterias" className="text-gray-300 hover:text-white transition-colors">Loterías</a></li>
                <li><a href="/chances" className="text-gray-300 hover:text-white transition-colors">Chances</a></li>
                <li><a href="/baloto" className="text-gray-300 hover:text-white transition-colors">Baloto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📱 Búsqueda por voz disponible</li>
                <li>🔊 Asistente de voz integrado</li>
                <li>⚡ Resultados en tiempo real</li>
                <li>🎯 Todas las loterías de Colombia</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Loterías Colombia. Juega responsablemente. +18</p>
            <p className="text-sm mt-2">
              Los resultados mostrados son de carácter informativo. Verifica los resultados oficiales en los puntos de venta autorizados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
