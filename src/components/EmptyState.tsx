import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
  suggestion?: string;
}

export default function EmptyState({ 
  message = 'No se encontraron resultados',
  suggestion = 'Intenta buscar con otro término o usa la búsqueda por voz'
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <SearchX className="w-16 h-16 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">{message}</h3>
      <p className="text-gray-500 text-center max-w-md">{suggestion}</p>
    </div>
  );
}
