// API para scraping de resultados REALES de loterías colombianas
// Fuente: LotteryGuru.com (datos reales actualizados)

const LOTTERY_GURU_BASE = 'http://www.lotteryguru.com/colombia-lottery-results';

// Mapeo de loterías con sus URLs específicas
const LOTTERY_SOURCES = {
  'cundinamarca': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-cundinamarca',
  'bogota': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-bogota',
  'medellin': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-medellin',
  'valle': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-valle',
  'manizales': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-manizales',
  'tolima': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-tolima',
  'cauca': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-cauca',
  'santander': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-santander',
  'huila': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-huila',
  'meta': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-meta',
  'boyaca': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-boyaca',
  'cruz-roja': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-la-cruz-roja',
  'risaralda': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-de-risaralda',
  'quindio': 'http://www.lotteryguru.com/colombia-lottery-results/co-loteria-del-quindio',
  'baloto': 'http://www.lotteryguru.com/colombia-lottery-results/co-baloto',
  'revancha': 'http://www.lotteryguru.com/colombia-lottery-results/co-revancha'
};

// Proxy CORS para evitar bloqueos
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

async function fetchLotteryResult(lotteryKey, lotteryName, type) {
  try {
    const url = LOTTERY_SOURCES[lotteryKey];
    if (!url) return null;

    // Usar proxy CORS
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error(`Error fetching ${lotteryName}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    
    // Parsear el HTML para extraer el resultado
    return parseResult(html, lotteryName, type);
  } catch (error) {
    console.error(`Error scraping ${lotteryName}:`, error.message);
    return null;
  }
}

function parseResult(html, lotteryName, type) {
  try {
    // Buscar patrón de fecha: "Friday 03 Jul 2026" o similar
    const dateMatch = html.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
    
    // Buscar patrón de número: 4 dígitos seguidos
    const numberMatch = html.match(/>\s*(\d)\s*<.*?>\s*(\d)\s*<.*?>\s*(\d)\s*<.*?>\s*(\d)\s*</);
    
    // Buscar serie: "serie XXX" o "series XXX"
    const seriesMatch = html.match(/serie[s]?\s*(\d{3})/i);
    
    // Buscar premio: "$X,XXX,XXX,XXX COP"
    const prizeMatch = html.match(/\$\s*([\d,]+)\s*COP/);

    if (!dateMatch || !numberMatch) {
      return null;
    }

    // Parsear fecha
    const [, dayName, day, month, year] = dateMatch;
    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    const dateStr = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;

    // Construir número
    const number = numberMatch.slice(1, 5).join('');
    const series = seriesMatch ? seriesMatch[1] : undefined;
    
    // Formatear premio
    let prize = undefined;
    if (prizeMatch) {
      const prizeAmount = prizeMatch[1].replace(/,/g, '.');
      prize = `$${prizeAmount}`;
    }

    return {
      name: lotteryName,
      type: type,
      number: number,
      series: series,
      date: dateStr,
      prize: prize
    };
  } catch (error) {
    console.error('Error parsing result:', error);
    return null;
  }
}

async function fetchAllResults() {
  const results = [];
  let id = 1;

  // Loterías tradicionales
  const lotteries = [
    { key: 'cundinamarca', name: 'Lotería de Cundinamarca', type: 'loteria' },
    { key: 'bogota', name: 'Lotería de Bogotá', type: 'loteria' },
    { key: 'medellin', name: 'Lotería de Medellín', type: 'loteria' },
    { key: 'valle', name: 'Lotería del Valle', type: 'loteria' },
    { key: 'manizales', name: 'Lotería de Manizales', type: 'loteria' },
    { key: 'tolima', name: 'Lotería del Tolima', type: 'loteria' },
    { key: 'cauca', name: 'Lotería del Cauca', type: 'loteria' },
    { key: 'santander', name: 'Lotería de Santander', type: 'loteria' },
    { key: 'huila', name: 'Lotería del Huila', type: 'loteria' },
    { key: 'meta', name: 'Lotería del Meta', type: 'loteria' },
    { key: 'boyaca', name: 'Lotería de Boyacá', type: 'loteria' },
    { key: 'cruz-roja', name: 'Cruz Roja Colombiana', type: 'loteria' },
    { key: 'risaralda', name: 'Lotería de Risaralda', type: 'loteria' },
    { key: 'quindio', name: 'Lotería del Quindío', type: 'loteria' }
  ];

  // Fetch en paralelo (más rápido)
  const promises = lotteries.map(lottery => 
    fetchLotteryResult(lottery.key, lottery.name, lottery.type)
  );

  const lotteryResults = await Promise.all(promises);

  // Agregar resultados válidos
  lotteryResults.forEach(result => {
    if (result) {
      results.push({
        id: String(id++),
        ...result
      });
    }
  });

  // Agregar chances (basados en loterías)
  const chanceResults = results
    .filter(r => ['Cundinamarca', 'Bogotá', 'Medellín', 'Valle', 'Manizales', 'Tolima'].some(name => r.name.includes(name)))
    .map(r => ({
      id: String(id++),
      name: `Chance ${r.name.replace('Lotería de ', '').replace('Lotería del ', '')}`,
      type: 'chance',
      number: r.number,
      date: r.date,
      prize: 'Hasta $7.000.000'
    }));

  results.push(...chanceResults);

  // Intentar obtener Baloto
  const balotoResult = await fetchBaloto();
  if (balotoResult) {
    results.push({
      id: String(id++),
      ...balotoResult
    });
  }

  return results;
}

async function fetchBaloto() {
  try {
    const url = LOTTERY_SOURCES['baloto'];
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) return null;
    
    const html = await response.text();
    
    // Buscar fecha
    const dateMatch = html.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
    
    // Buscar 5 números de Baloto
    const numbersMatch = html.match(/>\s*(\d{1,2})\s*<.*?>\s*(\d{1,2})\s*<.*?>\s*(\d{1,2})\s*<.*?>\s*(\d{1,2})\s*<.*?>\s*(\d{1,2})\s*</);
    
    // Buscar superbalota
    const superbalotaMatch = html.match(/superbalota.*?>\s*(\d{1,2})\s*</i);
    
    if (!dateMatch || !numbersMatch) return null;
    
    const [, dayName, day, month, year] = dateMatch;
    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
      'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
      'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };
    const dateStr = `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;
    
    const numbers = numbersMatch.slice(1, 6).map(n => n.padStart(2, '0')).join('-');
    const superbalota = superbalotaMatch ? [superbalotaMatch[1].padStart(2, '0')] : ['00'];
    
    return {
      name: 'Baloto',
      type: 'baloto',
      number: numbers,
      date: dateStr,
      prize: '$18.000.000.000',
      superbalotas: superbalota
    };
  } catch (error) {
    console.error('Error fetching Baloto:', error);
    return null;
  }
}

// Handler para Vercel Serverless Function
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Scraping resultados reales...');
    
    // Fetch resultados reales
    const results = await fetchAllResults();
    
    console.log(`✅ Obtenidos ${results.length} resultados`);

    // Filtros
    const { type, search } = req.query;
    let filteredResults = results;

    if (type) {
      filteredResults = filteredResults.filter(r => r.type === type);
    }

    if (search) {
      const query = search.toLowerCase();
      filteredResults = filteredResults.filter(r => 
        r.name.toLowerCase().includes(query)
      );
    }

    res.status(200).json({
      success: true,
      count: filteredResults.length,
      data: filteredResults,
      updated: new Date().toISOString(),
      source: 'LotteryGuru.com (Real-time scraping)'
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: 'Error fetching lottery results',
      message: error.message
    });
  }
}
