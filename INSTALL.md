# 🚀 Guía de Instalación Rápida

## Opción 1: Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/cristiangarzon5081-source/Loterias.git
cd Loterias
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar la aplicación
```bash
npm run dev
```

### 4. Abrir en el navegador
Abre [http://localhost:5173](http://localhost:5173) en tu navegador

**Navegadores recomendados para búsqueda por voz:**
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Safari

---

## Opción 2: Build para Producción

### 1. Construir la aplicación
```bash
npm run build
```

### 2. Previsualizar el build
```bash
npm run preview
```

---

## ⚡ Inicio Rápido con Características

### Usar Búsqueda por Texto
1. Abre la aplicación en tu navegador
2. Escribe en el buscador: "Lotería de Cundinamarca"
3. ¡Los resultados aparecerán instantáneamente!

### Usar Búsqueda por Voz 🎤
1. Haz clic en el botón del micrófono (círculo azul grande)
2. Permite el acceso al micrófono (primera vez solamente)
3. Di claramente: "Lotería de Bogotá"
4. El resultado aparecerá y se leerá automáticamente

### Escuchar Resultados 🔊
1. En cualquier tarjeta de resultado, busca el botón de altavoz
2. Haz clic para escuchar el resultado completo
3. El asistente dirá: fecha, lotería, número y serie

---

## 🔧 Solución de Problemas

### El micrófono no funciona
- **Problema:** La búsqueda por voz no inicia
- **Solución:** 
  1. Verifica permisos del micrófono en tu navegador
  2. Usa Chrome o Edge (mejor soporte)
  3. Asegúrate de estar en HTTPS o localhost

### La voz no se escucha
- **Problema:** El asistente no lee los resultados
- **Solución:**
  1. Verifica que tu volumen no esté silenciado
  2. Prueba en otro navegador
  3. Verifica la configuración de audio del sistema

### Error al instalar dependencias
- **Problema:** `npm install` falla
- **Solución:**
  ```bash
  # Limpiar caché e intentar de nuevo
  npm cache clean --force
  rm -rf node_modules
  npm install
  ```

### Puerto 5173 en uso
- **Problema:** El puerto está ocupado
- **Solución:**
  ```bash
  # Vite usará automáticamente el siguiente puerto disponible
  # O especifica uno manualmente
  npm run dev -- --port 3000
  ```

---

## 📱 Uso en Móviles

La aplicación funciona perfectamente en dispositivos móviles:

1. Abre en tu navegador móvil
2. La búsqueda por voz funciona en:
   - ✅ Chrome Android
   - ✅ Safari iOS
   - ✅ Edge móvil

---

## 🎯 Primeros Pasos

### Explora las Categorías
1. **Inicio** - Ver resultados recientes
2. **Loterías** - Ver todas las loterías tradicionales
3. **Chances** - Ver todos los chances disponibles
4. **Baloto** - Ver Baloto y Baloto Revancha

### Búsquedas Sugeridas
Prueba estas búsquedas para familiarizarte:
- "Cundinamarca"
- "Baloto"
- "Chance Bogotá"
- "Lotería del Valle"

---

## 💡 Consejos Pro

1. **Búsqueda por voz precisa:**
   - Di el nombre completo: "Lotería de Cundinamarca"
   - Habla pausado y claro
   - Evita ruidos de fondo

2. **Navegación rápida:**
   - Usa los botones de categoría en la página principal
   - Los resultados se actualizan mientras escribes

3. **Accesibilidad:**
   - Toda la interfaz es accesible por teclado
   - El asistente de voz ayuda a personas con dificultades visuales

---

## 🆘 ¿Necesitas Ayuda?

Si encuentras algún problema:
1. Revisa esta guía de instalación
2. Lee el [README.md](README.md) completo
3. Abre un issue en GitHub

---

¡Disfruta usando la aplicación! 🎰🍀
