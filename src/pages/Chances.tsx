import { LOTTERIES } from '../data/lotteries';
import LotteryList from '../components/LotteryList';
import { Hash } from 'lucide-react';

export default function Chances() {
  const chances = LOTTERIES.filter(l => l.type === 'chance');

  return (
    <div className="min-h-screen pb-12">
      <div className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Hash className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Chances
          </h1>
          <p className="text-xl text-green-100 text-center max-w-2xl mx-auto">
            Consulta los resultados de todos los chances de Colombia
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <LotteryList 
            lotteries={chances} 
            title={`${chances.length} Chances Disponibles`}
          />
          
          <div className="mt-12 bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-green-900 mb-3">
              ℹ️ Sobre los Chances
            </h3>
            <div className="text-green-800 space-y-2">
              <p>
                Los chances son juegos de apuestas basados en los resultados de las loterías tradicionales. 
                Son más accesibles y ofrecen múltiples modalidades de juego con diferentes premios.
              </p>
              <p className="font-semibold mt-4">Modalidades más comunes:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Chance Directo:</strong> Acierta las 4 cifras en el orden exacto</li>
                <li><strong>Chance Combinado:</strong> Acierta las 4 cifras en cualquier orden</li>
                <li><strong>Chance de 3:</strong> Acierta las últimas 3 cifras</li>
                <li><strong>Chance de 2:</strong> Acierta las últimas 2 cifras</li>
              </ul>
              <p className="mt-4">
                Los premios varían según la modalidad y el valor apostado, pudiendo llegar hasta $7.000.000 
                por una apuesta de $1.000 en chance directo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
