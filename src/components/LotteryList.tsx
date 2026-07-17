import { Lottery } from '../types/lottery';
import { Calendar, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LotteryListProps {
  lotteries: Lottery[];
  title: string;
}

export default function LotteryList({ lotteries, title }: LotteryListProps) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'loteria':
        return 'bg-blue-500 text-white';
      case 'chance':
        return 'bg-green-500 text-white';
      case 'baloto':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lotteries.map((lottery) => (
          <Link
            key={lottery.id}
            to={`/?search=${encodeURIComponent(lottery.name)}`}
            className="lottery-card group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                {lottery.name}
              </h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(lottery.type)}`}>
                {lottery.type.charAt(0).toUpperCase() + lottery.type.slice(1)}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 flex items-start">
              <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{lottery.description}</span>
            </p>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-semibold">Sorteos:</span>
              <span className="ml-2">{lottery.drawDays.join(', ')}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-primary-600 font-semibold text-sm group-hover:text-primary-700">
                Ver resultados →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
