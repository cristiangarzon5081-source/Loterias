export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-semibold">Cargando resultados...</p>
    </div>
  );
}
