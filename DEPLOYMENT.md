# 🌐 Guía de Despliegue

## 🚀 Opción 1: Vercel (Recomendado)

**Gratis, rápido y sin configuración**

### Pasos:
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Sign Up" (registrarse)
3. Conecta con tu cuenta de GitHub
4. Haz clic en "Import Project"
5. Selecciona el repositorio `Loterias`
6. Haz clic en "Deploy"

**¡Listo!** Tu app estará en: `https://loterias-[tu-usuario].vercel.app`

### Tiempo estimado: 2-3 minutos

---

## 📦 Opción 2: Netlify

**También gratis y muy fácil**

### Pasos:
1. Ve a [netlify.com](https://netlify.com)
2. Registrarse con GitHub
3. Clic en "Add new site" → "Import an existing project"
4. Selecciona tu repositorio `Loterias`
5. Configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Clic en "Deploy"

**URL:** `https://loterias-[random].netlify.app`

### Tiempo estimado: 3-5 minutos

---

## 🔷 Opción 3: GitHub Pages

**Hosting gratis desde GitHub**

### Pasos:

1. **Agregar configuración para GitHub Pages:**

```bash
cd Loterias
```

2. **Editar `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Loterias/', // Agregar esta línea
})
```

3. **Crear script de deploy en `package.json`:**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. **Instalar gh-pages:**
```bash
npm install --save-dev gh-pages
```

5. **Hacer deploy:**
```bash
npm run deploy
```

6. **Activar en GitHub:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `gh-pages` → `/root`
   - Save

**URL:** `https://cristiangarzon5081-source.github.io/Loterias/`

### Tiempo estimado: 5-10 minutos

---

## 🟠 Opción 4: Cloudflare Pages

**CDN global súper rápido**

### Pasos:
1. Ve a [pages.cloudflare.com](https://pages.cloudflare.com)
2. Registrarse/Login
3. "Create a project" → "Connect to Git"
4. Selecciona el repositorio
5. Configuración:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
6. "Save and Deploy"

**URL:** `https://loterias.pages.dev`

---

## ⚡ Comparación Rápida

| Servicio | Velocidad Setup | CDN Global | SSL Gratis | Actualizaciones Auto |
|----------|----------------|------------|------------|---------------------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| **Netlify** | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ✅ |
| **GitHub Pages** | ⭐⭐⭐ | ✅ | ✅ | ✅ |
| **Cloudflare** | ⭐⭐⭐⭐ | ✅ | ✅ | ✅ |

---

## 🎯 Recomendación

### Para empezar rápido:
**→ Usa Vercel** (2 minutos, 0 configuración)

### Para máximo control:
**→ Usa Netlify** (más opciones avanzadas)

### Para no salir de GitHub:
**→ Usa GitHub Pages** (todo en un mismo lugar)

---

## 🔄 Actualizaciones Automáticas

Con **Vercel, Netlify y Cloudflare**:
- Cada vez que hagas `git push` al repositorio
- Se desplegará automáticamente la nueva versión
- Sin necesidad de hacer nada manualmente

Con **GitHub Pages**:
- Necesitas ejecutar `npm run deploy` cada vez

---

## 🌐 Dominio Personalizado (Opcional)

Todos estos servicios permiten agregar tu propio dominio:

### Si tienes un dominio (ejemplo: loterias.com):
1. Ve a la configuración del servicio
2. "Add custom domain"
3. Sigue las instrucciones para configurar DNS
4. ¡Listo!

Ejemplo: `www.loteriascolombia.com`

---

## 📱 URL Final

Después de desplegar, compartirás una URL como:

```
https://loterias-colombia.vercel.app
```

O con tu dominio:
```
https://www.loteriascolombia.com
```

---

## ⚠️ Nota Importante

### Permisos del Navegador
- La **búsqueda por voz** necesita HTTPS
- Todos estos servicios incluyen HTTPS gratis
- En `localhost` también funciona

### Navegadores Compatibles
- ✅ Chrome/Edge (mejor experiencia)
- ✅ Safari
- ⚠️ Firefox (sin búsqueda por voz)

---

## 🆘 ¿Problemas?

### La app no carga:
1. Verifica que `npm run build` funcione localmente
2. Revisa los logs del servicio de hosting
3. Asegúrate de que el directorio de salida sea `dist`

### Búsqueda por voz no funciona:
1. Verifica que estés en HTTPS
2. Permite permisos de micrófono
3. Usa Chrome o Edge

---

## 🎉 ¡Todo listo!

Sigue estos pasos y en menos de 5 minutos tendrás tu app en línea, accesible desde cualquier parte del mundo.

**¿Cuál servicio prefieres?** Te ayudo con los detalles específicos.
