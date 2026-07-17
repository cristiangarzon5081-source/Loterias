import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { voiceService } from '../services/voiceService';

interface VoiceSearchProps {
  onVoiceResult: (transcript: string) => void;
  autoNavigate?: boolean;
}

export default function VoiceSearch({ onVoiceResult, autoNavigate = true }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(voiceService.isRecognitionSupported());
    // Cargar voces al montar el componente
    voiceService.loadVoices();
  }, []);

  const startListening = () => {
    setError(null);
    setIsListening(true);

    voiceService.startRecognition(
      (transcript) => {
        console.log('Transcripción recibida:', transcript);
        setIsListening(false);
        onVoiceResult(transcript);
        
        // Retroalimentación de voz
        if (autoNavigate) {
          voiceService.speak('Buscando resultados');
        }
      },
      (errorMsg) => {
        console.error('Error de reconocimiento:', errorMsg);
        setError(errorMsg);
        setIsListening(false);
      }
    );
  };

  const stopListening = () => {
    voiceService.stopRecognition();
    setIsListening(false);
  };

  if (!isSupported) {
    return (
      <div className="text-center p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <p className="text-yellow-800 font-semibold">
          ⚠️ Tu navegador no soporta búsqueda por voz
        </p>
        <p className="text-yellow-600 text-sm mt-1">
          Por favor, usa Chrome, Edge o Safari para esta función
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={!isSupported}
        className={`
          relative p-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 voice-pulse' 
            : 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
          }
          ${!isSupported ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {isListening ? (
          <MicOff className="w-12 h-12 text-white" />
        ) : (
          <Mic className="w-12 h-12 text-white" />
        )}
        
        {isListening && (
          <span className="absolute inset-0 rounded-full bg-red-400 opacity-75 animate-ping" />
        )}
      </button>

      <div className="text-center">
        {isListening ? (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-primary-700 flex items-center justify-center space-x-2">
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span>Escuchando...</span>
            </p>
            <p className="text-sm text-gray-600">
              Di el nombre de la lotería, chance o baloto
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-700">
              Toca el micrófono para buscar por voz
            </p>
            <p className="text-sm text-gray-500">
              Ejemplo: "Lotería de Cundinamarca" o "Baloto"
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 max-w-md">
          <p className="text-red-800 text-sm font-semibold">❌ {error}</p>
        </div>
      )}

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 max-w-2xl">
        <p className="text-blue-900 font-semibold mb-2">💡 Consejos para mejor reconocimiento:</p>
        <ul className="text-blue-800 text-sm space-y-1 list-disc list-inside">
          <li>Habla claro y pausadamente</li>
          <li>Di el nombre completo: "Lotería de Bogotá"</li>
          <li>Evita ruidos de fondo</li>
          <li>Mantén el micrófono cerca</li>
        </ul>
      </div>
    </div>
  );
}
