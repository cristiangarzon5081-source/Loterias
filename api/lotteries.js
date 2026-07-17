// API Serverless para obtener resultados de loterías colombianas
// ⚠️ IMPORTANTE: Estos son datos de EJEMPLO
// Debes actualizarlos MANUALMENTE con los resultados reales después de cada sorteo

// 📅 FECHAS Y HORARIOS DE SORTEOS:
// - Cundinamarca: Lunes y Jueves a las 10:30 PM
// - Bogotá: Martes y Viernes a las 10:30 PM
// - Medellín: Martes y Viernes a las 10:30 PM
// - Valle: Miércoles y Sábado a las 10:30 PM
// - Baloto: Martes y Viernes a las 10:30 PM

// 🔴 ADVERTENCIA: NO uses estos datos antes del sorteo
// Verifica los resultados oficiales en:
// - https://www.loteriascundinamarca.com
// - https://www.loteriabogota.com
// - https://baloto.com

const LATEST_RESULTS = [
  // ⚠️ EJEMPLO - Actualizar con datos reales después del sorteo
  {
    id: '1',
    name: 'Lotería de Cundinamarca',
    type: 'loteria',
    number: 'PENDIENTE',  // ← Cambiar después del sorteo
    series: '000',         // ← Cambiar después del sorteo
    date: '2026-07-14',    // ← ÚLTIMA VEZ QUE JUGÓ (Lunes 14 julio)
    prize: '$5.000.000.000',
    status: 'Próximo sorteo: Jueves 17 Julio 10:30 PM'
  },
  {
    id: '2',
    name: 'Lotería de Bogotá',
    type: 'loteria',
    number: 'PENDIENTE',  // ← Cambiar después del sorteo
    series: '000',         // ← Cambiar después del sorteo
    date: '2026-07-11',    // ← ÚLTIMA VEZ QUE JUGÓ (Viernes 11 julio)
    prize: '$4.500.000.000',
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  },
  {
    id: '3',
    name: 'Baloto',
    type: 'baloto',
    number: 'PENDIENTE',  // ← Cambiar después del sorteo
    date: '2026-07-15',    // ← ÚLTIMA VEZ QUE JUGÓ (Martes 15 julio)
    prize: '$18.000.000.000',
    superbalotas: ['00'],
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  },
  {
    id: '4',
    name: 'Baloto Revancha',
    type: 'baloto',
    number: 'PENDIENTE',
    date: '2026-07-15',
    prize: '$2.500.000.000',
    superbalotas: ['00'],
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  },
  {
    id: '5',
    name: 'Chance Cundinamarca',
    type: 'chance',
    number: 'PENDIENTE',
    date: '2026-07-14',
    prize: 'Hasta $7.000.000',
    status: 'Próximo sorteo: Jueves 17 Julio 10:30 PM'
  },
  {
    id: '6',
    name: 'Lotería de Medellín',
    type: 'loteria',
    number: 'PENDIENTE',
    series: '000',
    date: '2026-07-11',
    prize: '$4.800.000.000',
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  },
  {
    id: '7',
    name: 'Lotería del Valle',
    type: 'loteria',
    number: 'PENDIENTE',
    series: '000',
    date: '2026-07-13',
    prize: '$4.200.000.000',
    status: 'Próximo sorteo: Sábado 19 Julio 10:30 PM'
  },
  {
    id: '8',
    name: 'Chance Bogotá',
    type: 'chance',
    number: 'PENDIENTE',
    date: '2026-07-11',
    prize: 'Hasta $7.000.000',
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  },
  {
    id: '9',
    name: 'Lotería de Manizales',
    type: 'loteria',
    number: 'PENDIENTE',
    series: '000',
    date: '2026-07-13',
    prize: '$3.900.000.000',
    status: 'Próximo sorteo: Sábado 19 Julio 10:30 PM'
  },
  {
    id: '10',
    name: 'Lotería del Cauca',
    type: 'loteria',
    number: 'PENDIENTE',
    series: '000',
    date: '2026-07-11',
    prize: '$3.500.000.000',
    status: 'Próximo sorteo: Viernes 18 Julio 10:30 PM'
  }
];

// Handler para Vercel Serverless Functions
export default function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { type, search } = req.query;

    let results = LATEST_RESULTS;

    // Filtrar por tipo si se proporciona
    if (type) {
      results = results.filter(r => r.type === type);
    }

    // Buscar por nombre si se proporciona
    if (search) {
      const query = search.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(query)
      );
    }

    // Responder con los resultados
    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
      updated: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
