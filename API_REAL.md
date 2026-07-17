# 🔌 Conexión con API Real de Loterías

## ✅ Solución Implementada

Tu aplicación ahora incluye:

1. **API Serverless** (`/api/lotteries.js`) - Funciona automáticamente en Vercel
2. **Datos actualizados** con fechas del día actual
3. **Sistema de fallback** - Si falla la API, usa datos mock

---

## 🚀 Cómo Funciona

### En Vercel (Producción)

Cuando despliegas en Vercel, la carpeta `/api` se convierte automáticamente en **endpoints serverless**:

```
https://tu-app.vercel.app/api/lotteries
```

### Endpoints Disponibles

#### 1. Obtener todos los resultados
```bash
GET /api/lotteries
```

**Respuesta:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "1",
      "name": "Lotería de Cundinamarca",
      "type": "loteria",
      "number": "4521",
      "series": "089",
      "date": "2026-07-17",
      "prize": "$5.000.000.000"
    }
  ],
  "updated": "2026-07-17T02:30:00.000Z"
}
```

#### 2. Filtrar por tipo
```bash
GET /api/lotteries?type=baloto
GET /api/lotteries?type=loteria
GET /api/lotteries?type=chance
```

#### 3. Buscar por nombre
```bash
GET /api/lotteries?search=cundinamarca
GET /api/lotteries?search=baloto
```

---

## 📝 Actualizar Datos Manualmente

### Opción 1: Editar directamente en Vercel

1. Ve a tu proyecto en Vercel
2. Abre el archivo `api/lotteries.js`
3. Edita el array `LATEST_RESULTS`
4. Guarda y Vercel redesplegará automáticamente

### Opción 2: Editar localmente y hacer push

```bash
cd Loterias
nano api/lotteries.js  # o usa tu editor favorito
git add api/lotteries.js
git commit -m "Actualizar resultados de loterías"
git push
```

### Ejemplo de actualización:

```javascript
const LATEST_RESULTS = [
  {
    id: '1',
    name: 'Lotería de Cundinamarca',
    type: 'loteria',
    number: '1234',  // ← Cambiar aquí
    series: '089',
    date: '2026-07-18',  // ← Actualizar fecha
    prize: '$5.000.000.000'
  }
];
```

---

## 🤖 Automatización con Scraping (Futuro)

### Opción A: Cron Job en Vercel

Crear un endpoint para actualizar automáticamente:

```javascript
// api/update-results.js
export default async function handler(req, res) {
  // Scraping de sitios oficiales
  const results = await scrapeOfficialSites();
  
  // Guardar en base de datos o archivo
  await saveResults(results);
  
  res.json({ success: true, updated: results.length });
}
```

Configurar en `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/update-results",
    "schedule": "0 22 * * *"
  }]
}
```

### Opción B: GitHub Actions

Crear `.github/workflows/update-lotteries.yml`:

```yaml
name: Update Lottery Results
on:
  schedule:
    - cron: '0 22 * * *'  # 10 PM diariamente

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Scrape and update
        run: |
          # Script para scraping
          node scripts/scrape-lotteries.js
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add api/lotteries.js
          git commit -m "Auto-update lottery results"
          git push
```

---

## 🌐 APIs Públicas de Loterías (Para Referencia)

### 🇨🇴 Fuentes Oficiales Colombianas

#### Baloto Oficial
```
https://baloto.com
```
- ⚠️ No tiene API pública
- ✅ Se puede hacer scraping del sitio

#### LotteryGuru
```
http://www.lotteryguru.com/colombia-lottery-results
```
- ✅ Datos públicos
- ⚠️ No es API, requiere scraping

#### Multilotto
```
https://www.multilotto.com/results/colombia-baloto
```
- ✅ Datos actualizados
- ⚠️ No es API, requiere scraping

---

## 🛠️ Script de Scraping (Ejemplo)

Crear `scripts/scrape-lotteries.js`:

```javascript
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeBaloto() {
  try {
    const { data } = await axios.get('https://www.multilotto.com/results/colombia-baloto');
    const $ = cheerio.load(data);
    
    // Extraer números
    const numbers = [];
    $('.ball-number').each((i, el) => {
      numbers.push($(el).text());
    });
    
    return {
      id: 'baloto-' + Date.now(),
      name: 'Baloto',
      type: 'baloto',
      number: numbers.slice(0, 5).join('-'),
      date: new Date().toISOString().split('T')[0],
      prize: '$18.000.000.000',
      superbalotas: [numbers[5]]
    };
  } catch (error) {
    console.error('Error scraping Baloto:', error);
    return null;
  }
}

async function updateResults() {
  const baloto = await scrapeBaloto();
  
  if (baloto) {
    // Leer archivo actual
    const apiPath = './api/lotteries.js';
    let content = fs.readFileSync(apiPath, 'utf8');
    
    // Actualizar resultados
    // ... lógica para actualizar LATEST_RESULTS
    
    fs.writeFileSync(apiPath, content);
    console.log('✅ Resultados actualizados');
  }
}

updateResults();
```

---

## 📊 Conectar con Base de Datos (Avanzado)

### Usar Vercel KV (Redis)

```bash
npm install @vercel/kv
```

```javascript
// api/lotteries.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Leer de base de datos
  const results = await kv.get('lottery_results');
  
  res.json({
    success: true,
    data: results || LATEST_RESULTS
  });
}
```

### Usar Supabase (PostgreSQL)

```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { data } = await supabase
    .from('lottery_results')
    .select('*')
    .order('date', { ascending: false })
    .limit(10);
    
  res.json({ success: true, data });
}
```

---

## 🎯 Recomendación

### Para empezar AHORA:
✅ **Usa la API serverless incluida** con datos mock actualizados

### Para datos reales básicos:
✅ **Actualiza manualmente** el archivo `api/lotteries.js` después de cada sorteo

### Para automatización completa:
✅ **Implementa scraping** con GitHub Actions o Cron Job de Vercel

---

## 🆘 Soporte

Si necesitas ayuda para:
- 🤖 Implementar scraping automático
- 💾 Conectar una base de datos
- 🔄 Configurar actualizaciones automáticas

¡Avísame y te ayudo! 🚀
