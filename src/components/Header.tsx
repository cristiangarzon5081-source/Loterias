import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-2 rounded-lg group-hover:scale-110 transition-transform duration-200">
              <Ticket className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Loterías Colombia</h1>
              <p className="text-primary-100 text-sm">Resultados en tiempo real</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="text-white hover:text-primary-100 font-semibold transition-colors duration-200"
            >
              Inicio
            </Link>
            <Link 
              to="/loterias" 
              className="text-white hover:text-primary-100 font-semibold transition-colors duration-200"
            >
              Loterías
            </Link>
            <Link 
              to="/chances" 
              className="text-white hover:text-primary-100 font-semibold transition-colors duration-200"
            >
              Chances
            </Link>
            <Link 
              to="/baloto" 
              className="text-white hover:text-primary-100 font-semibold transition-colors duration-200"
            >
              Baloto
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <nav className="md:hidden mt-4 flex flex-col space-y-2 pb-2">
          <Link to="/" className="text-white hover:bg-primary-700 px-3 py-2 rounded-lg transition-colors">
            Inicio
          </Link>
          <Link to="/loterias" className="text-white hover:bg-primary-700 px-3 py-2 rounded-lg transition-colors">
            Loterías
          </Link>
          <Link to="/chances" className="text-white hover:bg-primary-700 px-3 py-2 rounded-lg transition-colors">
            Chances
          </Link>
          <Link to="/baloto" className="text-white hover:bg-primary-700 px-3 py-2 rounded-lg transition-colors">
            Baloto
          </Link>
        </nav>
      </div>
    </header>
  );
}
