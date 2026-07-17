import { LotteryResult } from '../types/lottery';
import { MOCK_RESULTS } from '../data/lotteries';

class LotteryService {
  // API de scraping (resultados REALES en tiempo real)
  private readonly API_URL = '/api/scrape-results';
  
  // Fallback a datos estáticos solo si falla el scraping
  private readonly STATIC_API_URL = '/api/lotteries';

  /**
   * Obtiene todos los resultados de loterías desde scraping en tiempo real
   */
  async getAllResults(): Promise<LotteryResult[]> {
    try {
      // Intentar con scraping en tiempo real primero
      console.log('🔍 Obteniendo resultados reales via scraping...');
      
      const response = await fetch(this.API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          console.log(`✅ ${data.count} resultados reales obtenidos desde ${data.source}`);
          return data.data;
        }
      }
      
      console.warn('⚠️ Scraping no disponible, intentando con API estática...');
      
      // Fallback a API estática
      const staticResponse = await fetch(this.STATIC_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (staticResponse.ok) {
        const staticData = await staticResponse.json();
        if (staticData.success && staticData.data.length > 0) {
          console.log('📦 Usando datos estáticos');
          return staticData.data;
        }
      }
    } catch (error) {
      console.error('❌ Error fetching lottery results:', error);
    }

    // Último recurso: datos mock
    console.warn('⚠️ Usando datos mock como último recurso');
    return this.getMockResults();
  }

  /**
   * Busca resultados por nombre de lotería
   */
  async searchResults(query: string): Promise<LotteryResult[]> {
    try {
      const allResults = await this.getAllResults();
      const normalizedQuery = this.normalizeText(query);
      
      return allResults.filter(result => {
        const normalizedName = this.normalizeText(result.name);
        return normalizedName.includes(normalizedQuery);
      });
    } catch (error) {
      console.error('Error searching lottery results:', error);
      return [];
    }
  }

  /**
   * Obtiene el resultado más reciente de una lotería específica
   */
  async getLatestResultByName(lotteryName: string): Promise<LotteryResult | null> {
    try {
      const results = await this.searchResults(lotteryName);
      if (results.length === 0) return null;
      
      // Ordenar por fecha descendente y tomar el primero
      return results.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )[0];
    } catch (error) {
      console.error('Error getting latest result:', error);
      return null;
    }
  }

  /**
   * Filtra resultados por tipo
   */
  async getResultsByType(type: 'loteria' | 'chance' | 'baloto'): Promise<LotteryResult[]> {
    try {
      const allResults = await this.getAllResults();
      return allResults.filter(result => result.type === type);
    } catch (error) {
      console.error('Error filtering by type:', error);
      return [];
    }
  }

  /**
   * Normaliza texto para búsqueda (quita acentos, convierte a minúsculas)
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  /**
   * Retorna resultados mock (para desarrollo y demostración)
   */
  private getMockResults(): LotteryResult[] {
    return MOCK_RESULTS;
  }

  /**
   * Intenta coincidir el texto de voz con nombres de loterías conocidas
   * Maneja variaciones comunes en el reconocimiento de voz
   */
  matchVoiceInput(voiceText: string): string {
    const normalized = this.normalizeText(voiceText);
    
    // Mapeo de variaciones comunes en reconocimiento de voz
    const variations: Record<string, string[]> = {
      'cundinamarca': ['cundinamarca', 'cundi', 'cundinarmarca', 'condinamarca'],
      'bogota': ['bogota', 'bogotá', 'voto ta', 'vogotá'],
      'medellin': ['medellin', 'medellín', 'me dejan', 'me de yin'],
      'valle': ['valle', 'baye', 'va ye', 'del valle'],
      'manizales': ['manizales', 'mani sales', 'mani zales'],
      'baloto': ['baloto', 'va lo to', 'baloto'],
      'revancha': ['revancha', 're van cha', 'rebancha'],
      'chance': ['chance', 'chan se', 'chanse'],
      'cauca': ['cauca', 'causa', 'caoca'],
      'tolima': ['tolima', 'to lima', 'thulima'],
      'santander': ['santander', 'san tan der', 'santandér'],
      'meta': ['meta', 'metta', 'de meta'],
      'huila': ['huila', 'uila', 'wila'],
      'boyaca': ['boyaca', 'boyacá', 'bo yaca'],
      'cruz roja': ['cruz roja', 'crus roja', 'crusroja', 'roja'],
      'risaralda': ['risaralda', 'risa ralda', 'risalda'],
      'quindio': ['quindio', 'quindío', 'kin dio']
    };

    // Buscar coincidencias
    for (const [canonical, variants] of Object.entries(variations)) {
      for (const variant of variants) {
        if (normalized.includes(variant)) {
          return canonical;
        }
      }
    }

    return voiceText;
  }
}

export const lotteryService = new LotteryService();
