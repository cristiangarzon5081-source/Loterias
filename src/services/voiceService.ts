export class VoiceService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;

  constructor() {
    // Inicializar Web Speech API para reconocimiento de voz
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'es-CO'; // Español de Colombia
      this.recognition.maxAlternatives = 3;
    }

    // Inicializar síntesis de voz
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  /**
   * Verifica si el reconocimiento de voz está soportado
   */
  isRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  /**
   * Verifica si la síntesis de voz está soportada
   */
  isSynthesisSupported(): boolean {
    return this.synthesis !== null;
  }

  /**
   * Inicia el reconocimiento de voz
   */
  startRecognition(
    onResult: (transcript: string) => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError('Reconocimiento de voz no soportado en este navegador');
      return;
    }

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    this.recognition.onerror = (event: any) => {
      let errorMessage = 'Error en el reconocimiento de voz';
      
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No se detectó ninguna voz. Por favor, intenta de nuevo.';
          break;
        case 'audio-capture':
          errorMessage = 'No se puede acceder al micrófono. Verifica los permisos.';
          break;
        case 'not-allowed':
          errorMessage = 'Permiso de micrófono denegado. Por favor, permite el acceso.';
          break;
        case 'network':
          errorMessage = 'Error de red. Verifica tu conexión a internet.';
          break;
        default:
          errorMessage = `Error: ${event.error}`;
      }
      
      onError(errorMessage);
    };

    this.recognition.onend = () => {
      // El reconocimiento ha terminado
    };

    try {
      this.recognition.start();
    } catch (error) {
      onError('No se pudo iniciar el reconocimiento de voz. Intenta de nuevo.');
    }
  }

  /**
   * Detiene el reconocimiento de voz
   */
  stopRecognition(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }

  /**
   * Lee un texto en voz alta
   */
  speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) {
      console.error('Síntesis de voz no soportada');
      return;
    }

    // Cancelar cualquier lectura en curso
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO';
    utterance.rate = 0.9; // Velocidad un poco más lenta para claridad
    utterance.pitch = 1;
    utterance.volume = 1;

    // Intentar usar una voz en español si está disponible
    const voices = this.synthesis.getVoices();
    const spanishVoice = voices.find(voice => 
      voice.lang.startsWith('es') || voice.lang.startsWith('es-')
    );
    
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
    }

    utterance.onerror = (event) => {
      console.error('Error en síntesis de voz:', event);
    };

    this.synthesis.speak(utterance);
  }

  /**
   * Detiene la lectura de voz
   */
  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Formatea el resultado de una lotería para ser leído en voz alta
   */
  formatResultForSpeech(result: {
    name: string;
    number: string;
    series?: string;
    date: string;
    prize?: string;
  }): string {
    const dateObj = new Date(result.date);
    const formattedDate = dateObj.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let speech = `Resultado de ${result.name}. `;
    speech += `Fecha: ${formattedDate}. `;
    
    // Para Baloto, leer números individualmente
    if (result.name.toLowerCase().includes('baloto')) {
      const numbers = result.number.split('-').join(', ');
      speech += `Números ganadores: ${numbers}. `;
    } else {
      // Para loterías tradicionales, leer dígito por dígito
      const numberDigits = result.number.split('').join(', ');
      speech += `Número ganador: ${numberDigits}. `;
      
      if (result.series) {
        const seriesDigits = result.series.split('').join(', ');
        speech += `Serie: ${seriesDigits}. `;
      }
    }

    if (result.prize) {
      speech += `Premio: ${result.prize}.`;
    }

    return speech;
  }

  /**
   * Carga las voces disponibles (necesario para algunos navegadores)
   */
  loadVoices(callback?: () => void): void {
    if (this.synthesis) {
      // En algunos navegadores, las voces se cargan de forma asíncrona
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          if (callback) callback();
        };
      }
      // Intentar cargar inmediatamente también
      this.synthesis.getVoices();
    }
  }
}

export const voiceService = new VoiceService();
