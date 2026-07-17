import { useState, useEffect } from 'react';
import { LotteryResult } from '../types/lottery';
import { Calendar, Trophy, Hash, Volume2 } from 'lucide-react';
import { voiceService } from '../services/voiceService';

interface ResultCardProps {
  result: LotteryResult;
  autoSpeak?: boolean;
}

export default function ResultCard({ result, autoSpeak = false }: ResultCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Verificar si el resultado está pendiente
  const isPending = result.number === 'PENDIENTE' || result.number.includes('PENDIENTE');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const speechText = voiceService.formatResultForSpeech(result);
      voiceService.speak(speechText, () => setIsSpeaking(false));
    }
  };

  // Auto-hablar si está habilitado (solo si no está pendiente)
  useEffect(() => {
    if (autoSpeak && !isPending && voiceService.isSynthesisSupported()) {
      const speechText = voiceService.formatResultForSpeech(result);
      voiceService.speak(speechText);
    }
  }, [autoSpeak, result, isPending]);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'loteria':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'chance':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'baloto':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'loteria':
        return 'Lotería';
      case 'chance':
        return 'Chance';
      case 'baloto':
        return 'Baloto';
      default:
        return type;
    }
  };

  return (
    <div className="lottery-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getBadgeColor(result.type)}`}>
              {getTypeLabel(result.type)}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{result.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(result.date)}</span>
          </div>
        </div>

        <button
          onClick={handleSpeak}
          className={`p-3 rounded-full transition-all duration-200 ${
            isSpeaking 
              ? 'bg-primary-500 text-white' 
              : 'bg-gray-100 hover:bg-primary-100 text-primary-600'
          }`}
          title="Escuchar resultado"
        >
          <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* Mostrar alerta si el resultado está pendiente */}
      {isPending && result.status && (
        <div className="mb-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-yellow-900">Sorteo Pendiente</p>
              <p className="text-sm text-yellow-800 mt-1">{result.status}</p>
              <p className="text-xs text-yellow-700 mt-2">
                Los números mostrados son de referencia. Actualiza esta página después del sorteo para ver los resultados reales.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">{isPending && (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-semibold mb-2">Resultado Pendiente</p>
            <p className="text-gray-600 text-sm">
              Este sorteo aún no se ha realizado.
            </p>
            {result.status && (
              <p className="text-gray-700 text-sm font-medium mt-2">
                {result.status}
              </p>
            )}
          </div>
        )}
        
        {!isPending && result.type === 'baloto' ? (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Hash className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-gray-700">Números Ganadores:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {result.number.split('-').map((num, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg"
                >
                  {num}
                </div>
              ))}
            </div>
            {result.superbalotas && result.superbalotas.length > 0 && (
              <div className="mt-4">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">Superbalota:</span>
                <div className="flex gap-2">
                  {result.superbalotas.map((num, idx) => (
                    <div
                      key={idx}
                      className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 text-lg font-bold rounded-full shadow-lg"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="w-5 h-5" />
                <span className="text-sm font-semibold">Número</span>
              </div>
              <p className="text-4xl font-bold tracking-wider">{result.number}</p>
            </div>

            {result.series && (
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Hash className="w-5 h-5" />
                  <span className="text-sm font-semibold">Serie</span>
                </div>
                <p className="text-4xl font-bold tracking-wider">{result.series}</p>
              </div>
            )}
          </div>
        )}

        {result.prize && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Premio Mayor</p>
                <p className="text-2xl font-bold text-yellow-700">{result.prize}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
