import { useState, useEffect } from 'react';
import { lotteryService } from '../services/lotteryService';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Circle } from 'lucide-react';
import { LotteryResult } from '../types/lottery';

export default function Baloto() {
  const [balotoResults, setBalotoResults] = useState<LotteryResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBalotoResults();
  }, []);

  const loadBalotoResults = async () => {
    setLoading(true);
    try {
      const results = await lotteryService.getResultsByType('baloto');
      setBalotoResults(results);
    } catch (error) {
      console.error('Error loading Baloto results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Circle className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Baloto & Baloto Revancha
          </h1>
          <p className="text-xl text-purple-100 text-center max-w-2xl mx-auto">
            Los resultados más recientes del juego de lotería más popular de Colombia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Resultados Recientes
          </h2>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {balotoResults.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-900 mb-3 flex items-center">
                <Circle className="w-6 h-6 mr-2" />
                ¿Cómo jugar Baloto?
              </h3>
              <div className="text-purple-800 space-y-2">
                <p>
                  Baloto es un juego de lotería donde debes seleccionar 5 números del 1 al 43 
                  y una Superbalota del 1 al 16.
                </p>
                <p className="font-semibold mt-4">Premios:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                  <li><strong>6 aciertos:</strong> Premio mayor (acumulado)</li>
                  <li><strong>5 aciertos + Superbalota:</strong> Premio segundo</li>
                  <li><strong>5 aciertos:</strong> Premio tercero</li>
                  <li><strong>4 aciertos + Superbalota:</strong> Premio cuarto</li>
                  <li><strong>4 aciertos:</strong> Premio quinto</li>
                  <li><strong>3 aciertos + Superbalota:</strong> Premio sexto</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center">
                <Circle className="w-6 h-6 mr-2" />
                Baloto Revancha
              </h3>
              <div className="text-indigo-800 space-y-2">
                <p>
                  Baloto Revancha te da una segunda oportunidad de ganar con los mismos números 
                  de tu jugada de Baloto.
                </p>
                <p className="font-semibold mt-4">Características:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                  <li>Se realiza inmediatamente después del sorteo de Baloto</li>
                  <li>Usa los mismos números que elegiste</li>
                  <li>Cuesta solo $500 adicionales</li>
                  <li>Premios independientes del Baloto principal</li>
                  <li>Sorteos: Martes y Viernes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              💰 Premios Acumulados
            </h3>
            <p className="text-gray-700">
              El premio mayor del Baloto puede acumularse hasta superar los <strong>$30.000 millones</strong>, 
              convirtiéndolo en uno de los juegos más atractivos de Colombia. Los sorteos se realizan 
              todos los <strong>martes y viernes</strong> a las 10:30 PM.
            </p>
          </div>

          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              📱 Dónde jugar
            </h3>
            <div className="text-blue-800 space-y-2">
              <p>Puedes jugar Baloto en:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Puntos de venta autorizados en todo el país</li>
                <li>Plataforma digital oficial de Baloto</li>
                <li>Aplicaciones móviles autorizadas</li>
              </ul>
              <p className="mt-4 text-sm italic">
                Recuerda: Juega responsablemente. Debes ser mayor de 18 años.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
