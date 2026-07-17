// API Serverless para obtener resultados de loterías colombianas
// Este archivo se puede desplegar en Vercel como API serverless

// Datos actualizados manualmente o mediante scraping programado
const LATEST_RESULTS = [
  {
    id: '1',
    name: 'Lotería de Cundinamarca',
    type: 'loteria',
    number: '4521',
    series: '089',
    date: new Date().toISOString().split('T')[0],
    prize: '$5.000.000.000'
  },
  {
    id: '2',
    name: 'Lotería de Bogotá',
    type: 'loteria',
    number: '7834',
    series: '145',
    date: new Date().toISOString().split('T')[0],
    prize: '$4.500.000.000'
  },
  {
    id: '3',
    name: 'Baloto',
    type: 'baloto',
    number: '05-12-23-34-41',
    date: new Date().toISOString().split('T')[0],
    prize: '$18.000.000.000',
    superbalotas: ['15']
  },
  {
    id: '4',
    name: 'Baloto Revancha',
    type: 'baloto',
    number: '07-18-25-36-43',
    date: new Date().toISOString().split('T')[0],
    prize: '$2.500.000.000',
    superbalotas: ['09']
  },
  {
    id: '5',
    name: 'Chance Cundinamarca',
    type: 'chance',
    number: '4521',
    date: new Date().toISOString().split('T')[0],
    prize: 'Hasta $7.000.000'
  },
  {
    id: '6',
    name: 'Lotería de Medellín',
    type: 'loteria',
    number: '3298',
    series: '067',
    date: new Date().toISOString().split('T')[0],
    prize: '$4.800.000.000'
  },
  {
    id: '7',
    name: 'Lotería del Valle',
    type: 'loteria',
    number: '6745',
    series: '123',
    date: new Date().toISOString().split('T')[0],
    prize: '$4.200.000.000'
  },
  {
    id: '8',
    name: 'Chance Bogotá',
    type: 'chance',
    number: '7834',
    date: new Date().toISOString().split('T')[0],
    prize: 'Hasta $7.000.000'
  },
  {
    id: '9',
    name: 'Lotería de Manizales',
    type: 'loteria',
    number: '1567',
    series: '092',
    date: new Date().toISOString().split('T')[0],
    prize: '$3.900.000.000'
  },
  {
    id: '10',
    name: 'Lotería del Cauca',
    type: 'loteria',
    number: '8923',
    series: '076',
    date: new Date().toISOString().split('T')[0],
    prize: '$3.500.000.000'
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
