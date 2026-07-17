# 🎰 Loterías Colombia

Aplicación web completa para consultar resultados de loterías, chances y Baloto de Colombia con búsqueda por voz y asistente de voz integrado.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-cyan)

## ✨ Características Principales

### 🎙️ Búsqueda por Voz Precisa
- **Reconocimiento de voz optimizado** para español de Colombia
- **Manejo inteligente de variaciones** en la pronunciación
- **Navegación automática** al resultado más reciente
- **Retroalimentación de voz** durante la búsqueda

### 🔊 Asistente de Voz
- **Lectura automática** de resultados al finalizar la búsqueda por voz
- **Narración completa** incluyendo:
  - Nombre de la lotería
  - Fecha exacta del sorteo
  - Número ganador (dígito por dígito)
  - Serie (cuando aplica)
  - Premio

### 🎯 Búsqueda de Texto
- Buscador preciso con autocompletado
- Búsqueda por nombre de lotería, chance o baloto
- Resultados instantáneos mientras escribes

### 📱 Diseño Responsive
- **Interfaz moderna y atractiva** con gradientes y animaciones
- **100% responsive** - funciona en móviles, tablets y desktop
- **Accesible** para personas con dificultades de lectura gracias a la búsqueda por voz

### 🎲 Cobertura Completa

#### Loterías Tradicionales (14+)
- Lotería de Cundinamarca
- Lotería de Bogotá
- Lotería de Medellín
- Lotería del Valle
- Lotería de Manizales
- Lotería del Cauca
- Lotería del Meta
- Lotería de Santander
- Lotería del Tolima
- Lotería del Huila
- Lotería de Boyacá
- Cruz Roja Colombiana
- Lotería de Risaralda
- Lotería del Quindío

#### Chances (6+)
- Chance Cundinamarca
- Chance Bogotá
- Chance Medellín
- Chance Valle
- Chance Manizales
- Chance Tolima

#### Baloto
- Baloto
- Baloto Revancha

## 🚀 Instalación

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/loterias-colombia.git
cd loterias-colombia
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 📖 Uso

### Búsqueda por Texto
1. Escribe el nombre de la lotería en el buscador
2. Los resultados se filtran automáticamente
3. Haz clic en "Escuchar resultado" para que el asistente lo lea

### Búsqueda por Voz
1. Haz clic en el botón del micrófono 🎤
2. Permite el acceso al micrófono (solo la primera vez)
3. Di claramente el nombre de la lotería
   - Ejemplo: "Lotería de Cundinamarca"
   - Ejemplo: "Baloto"
   - Ejemplo: "Chance Bogotá"
4. El resultado más reciente aparecerá automáticamente
5. El asistente de voz leerá el resultado en voz alta

### Consejos para Mejor Reconocimiento de Voz
- 🗣️ Habla claro y pausadamente
- 🎯 Di el nombre completo de la lotería
- 🔇 Evita ruidos de fondo
- 📱 Mantén el micrófono cerca

## 🏗️ Estructura del Proyecto

```
loterias-colombia/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes React reutilizables
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── VoiceSearch.tsx
│   │   ├── LotteryList.tsx
│   │   ├── ResultCard.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── EmptyState.tsx
│   ├── pages/          # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── Lotteries.tsx
│   │   ├── Chances.tsx
│   │   └── Baloto.tsx
│   ├── services/       # Lógica de negocio
│   │   ├── lotteryService.ts
│   │   └── voiceService.ts
│   ├── data/           # Datos estáticos
│   │   └── lotteries.ts
│   ├── types/          # Tipos TypeScript
│   │   └── lottery.ts
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18.2** - Framework UI
- **TypeScript 5.2** - Tipado estático
- **Vite 5.0** - Build tool y dev server
- **React Router 6** - Enrutamiento
- **Tailwind CSS 3.3** - Estilos

### APIs del Navegador
- **Web Speech API** (SpeechRecognition) - Reconocimiento de voz
- **Web Speech API** (SpeechSynthesis) - Síntesis de voz (text-to-speech)

### Iconos
- **Lucide React** - Iconos modernos

## 🌐 Compatibilidad de Navegadores

### Búsqueda por Voz (SpeechRecognition)
- ✅ Chrome/Edge (recomendado)
- ✅ Safari
- ❌ Firefox (no soportado actualmente)

### Asistente de Voz (SpeechSynthesis)
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari

### Diseño Responsive
- ✅ Todos los navegadores modernos

## 🔐 Permisos Necesarios

La aplicación solicitará permiso para:
- 🎤 **Micrófono** - Solo para la función de búsqueda por voz
- El permiso se solicita solo cuando intentas usar la búsqueda por voz
- Puedes denegar el permiso y seguir usando la búsqueda por texto

## 📊 Fuentes de Datos

Actualmente la aplicación usa datos **mock** (de ejemplo) para demostración.

### Integración con API Real

Para conectar con una API real de loterías:

1. Edita `src/services/lotteryService.ts`
2. Actualiza la URL de la API:
```typescript
private readonly API_URL = 'https://api.loterias.co/v1';
```
3. Implementa la lógica de fetch en cada método

Ejemplo:
```typescript
async getAllResults(): Promise<LotteryResult[]> {
  const response = await fetch(`${this.API_URL}/resultados`);
  const data = await response.json();
  return data;
}
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.js` para cambiar la paleta de colores:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores aquí
      }
    }
  }
}
```

### Loterías Disponibles
Edita `src/data/lotteries.ts` para agregar o modificar loterías:
```typescript
export const LOTTERIES: Lottery[] = [
  {
    id: 'nueva-loteria',
    name: 'Nueva Lotería',
    type: 'loteria',
    drawDays: ['Lunes', 'Jueves'],
    description: 'Descripción de la nueva lotería'
  }
];
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## ⚠️ Disclaimer

Esta aplicación es solo para fines informativos. Los resultados deben ser verificados en los puntos de venta oficiales. Juega responsablemente. +18.

## 📞 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.

---

**Desarrollado con ❤️ para Colombia**

🎰 ¡Buena suerte! 🍀
