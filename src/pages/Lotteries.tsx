import { LOTTERIES } from '../data/lotteries';
import LotteryList from '../components/LotteryList';
import { Ticket } from 'lucide-react';

export default function Lotteries() {
  const lotteries = LOTTERIES.filter(l => l.type === 'loteria');

  return (
    <div className="min-h-screen pb-12">
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Ticket className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Loterías Tradicionales
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Consulta los resultados de todas las loterías oficiales de Colombia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <LotteryList 
            lotteries={lotteries} 
            title={`${lotteries.length} Loterías Disponibles`}
          />
          
          <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">
              ℹ️ Sobre las Loterías Tradicionales
            </h3>
            <div className="text-blue-800 space-y-2">
              <p>
                Las loterías tradicionales de Colombia son juegos de azar oficiales operados por entidades 
                departamentales y beneficencias. Cada sorteo ofrece múltiples premios según el número y la serie.
              </p>
              <p className="font-semibold mt-4">Características:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Números de 4 cifras (0000 - 9999)</li>
                <li>Series que van desde 001 hasta 200 o más</li>
                <li>Sorteos semanales en días específicos</li>
                <li>Premios que pueden superar los $5.000 millones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
