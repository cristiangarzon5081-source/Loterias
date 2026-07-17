import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import VoiceSearch from '../components/VoiceSearch';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { lotteryService } from '../services/lotteryService';
import { LotteryResult } from '../types/lottery';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<LotteryResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [autoSpeak, setAutoSpeak] = useState(false);

  useEffect(() => {
    loadResults();
  }, []);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const allResults = await lotteryService.getAllResults();
      setResults(allResults);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      loadResults();
      setAutoSpeak(false);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await lotteryService.searchResults(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceResult = async (transcript: string) => {
    console.log('Búsqueda por voz:', transcript);
    
    // Intentar coincidir con nombres de loterías conocidas
    const matched = lotteryService.matchVoiceInput(transcript);
    console.log('Coincidencia procesada:', matched);
    
    // Buscar resultados
    setLoading(true);
    setAutoSpeak(true);
    
    try {
      const searchResults = await lotteryService.searchResults(matched);
      setResults(searchResults);
      setSearchQuery(matched);
      
      // Actualizar URL
      setSearchParams({ search: matched });
      
      // Si se encuentra exactamente un resultado, habilitar auto-speak
      if (searchResults.length === 1) {
        setTimeout(() => setAutoSpeak(true), 500);
      }
    } catch (error) {
      console.error('Error en búsqueda por voz:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResults = searchQuery 
    ? results 
    : results.slice(0, 6); // Mostrar solo los 6 más recientes en home

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">Resultados Actualizados</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Consulta Resultados de Loterías
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Encuentra los resultados más recientes de todas las loterías, chances y Baloto de Colombia
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="text-center">
              <p className="text-primary-100 mb-4 text-lg font-semibold">O busca con tu voz</p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20">
                <VoiceSearch onVoiceResult={handleVoiceResult} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-primary-600" />
              {searchQuery ? 'Resultados de búsqueda' : 'Resultados Recientes'}
            </h2>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchParams({});
                  loadResults();
                  setAutoSpeak(false);
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm md:text-base"
              >
                Ver todos →
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mb-6 bg-primary-50 border-2 border-primary-200 rounded-lg p-4">
              <p className="text-primary-800">
                <span className="font-semibold">Buscando:</span> "{searchQuery}"
              </p>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredResults.map((result, index) => (
                <ResultCard 
                  key={result.id} 
                  result={result} 
                  autoSpeak={autoSpeak && index === 0}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              message={`No se encontraron resultados para "${searchQuery}"`}
              suggestion="Intenta con otro nombre o usa la búsqueda por voz"
            />
          )}

          {!searchQuery && !loading && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">¿Buscas una lotería específica?</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => handleSearch('Cundinamarca')}
                  className="btn-secondary"
                >
                  Cundinamarca
                </button>
                <button
                  onClick={() => handleSearch('Bogotá')}
                  className="btn-secondary"
                >
                  Bogotá
                </button>
                <button
                  onClick={() => handleSearch('Baloto')}
                  className="btn-secondary"
                >
                  Baloto
                </button>
                <button
                  onClick={() => handleSearch('Medellín')}
                  className="btn-secondary"
                >
                  Medellín
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tiempo Real</h3>
            <p className="text-gray-600">Resultados actualizados al instante</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Búsqueda por Voz</h3>
            <p className="text-gray-600">Consulta sin necesidad de escribir</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Todas las Loterías</h3>
            <p className="text-gray-600">Loterías, chances y Baloto</p>
          </div>
        </div>
      </div>
    </div>
  );
}
