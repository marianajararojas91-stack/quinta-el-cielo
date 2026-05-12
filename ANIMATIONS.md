# 🎬 Animaciones GSAP - Quinta El Cielo

Este documento describe todas las animaciones implementadas en el sitio web utilizando GSAP y ScrollTrigger.

## 📦 Tecnologías Utilizadas

- **GSAP** (GreenSock Animation Platform) - v3.15.0
- **ScrollTrigger** - Plugin de GSAP para animaciones basadas en scroll
- **TypeScript** - Para type safety

## ✨ Animaciones Implementadas

### 1. **Hero Parallax Effect** ⭐⭐⭐
**Ubicación:** Sección Hero (#hero)

**Descripción:**
- La imagen de fondo se mueve más lento que el contenido al hacer scroll (efecto parallax)
- El contenido principal se desvanece gradualmente al scrollear hacia abajo
- Crea una sensación de profundidad y profesionalismo

**Código:**
```typescript
gsap.to(heroImage, {
  yPercent: 30,
  scrollTrigger: {
    trigger: heroSection,
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});
```

---

### 2. **Animated Counters** ⭐⭐⭐
**Ubicación:** Hero section

**Descripción:**
- Los números importantes (3,550m, 15-20 personas, 80 min) se animan contando desde 0
- Efecto muy impactante visualmente
- Se activa cuando el usuario scrollea hasta ellos

**Elementos con contador:**
- `data-counter="altitude"` - Altitud (3,550m)
- `data-counter="capacity-min"` - Capacidad mínima (15)
- `data-counter="capacity-max"` - Capacidad máxima (20)
- `data-counter="distance"` - Tiempo de viaje (80 min)

---

### 3. **Section Reveal Effect** ⭐⭐⭐
**Ubicación:** Todas las secciones excepto Hero

**Descripción:**
- Cada sección aparece con un fade-in suave y slide-up cuando entra al viewport
- Crea una experiencia de navegación fluida
- Se revierte si el usuario scrollea hacia arriba

**Parámetros:**
- Opacity: 0 → 1
- translateY: 80px → 0
- Duration: 1.2s
- Ease: power3.out

---

### 4. **Gallery Zoom Effect** ⭐⭐
**Ubicación:** Sección de Galería (#galeria)

**Descripción:**
- Las imágenes empiezan en escala 0.8 con opacity 0
- Crecen a escala 1 con fade-in
- Efecto stagger (aparecen una después de otra)

**Parámetros:**
- Scale: 0.8 → 1
- Stagger: 0.15s entre cada imagen

---

### 5. **Pricing Cards Animation** ⭐⭐⭐
**Ubicación:** Sección de Precios (#precios)

**Descripción:**
- Las tarjetas aparecen con lift effect (desde abajo)
- Efecto stagger profesional
- **Hover effect:** Las tarjetas se elevan y agregan sombra al pasar el mouse

**Animación hover:**
```typescript
mouseenter: y: -10, boxShadow aumenta
mouseleave: regresa a posición original
```

---

### 6. **Amenities Grid Animation** ⭐⭐
**Ubicación:** Sección de Amenidades (#amenidades)

**Descripción:**
- Los items aparecen deslizándose desde la izquierda
- Efecto stagger coordinado
- Fade-in gradual

---

### 7. **Enhanced Navbar Scroll** ⭐⭐
**Ubicación:** Navigation bar (#main-nav)

**Descripción:**
- Transición suave de navbar al hacer scroll
- Cambio de background color y shadow
- Backdrop blur effect

**Estados:**
- Top: backgroundColor semi-transparente, shadow ligero
- Scrolled: backgroundColor más sólido, shadow prominente

---

### 8. **Magnetic Button Effect** ⭐⭐⭐ (Premium)
**Ubicación:** Botones principales (Hero CTAs)

**Descripción:**
- Los botones "siguen" el cursor del mouse al hacer hover
- Efecto magnético sutil pero impactante
- Regresa con animación elástica

**Cómo usar:**
```html
<a data-magnetic>Mi Botón</a>
```

**Comportamiento:**
- mouseenter: Scale 1.05
- mousemove: Sigue el cursor (30% del movimiento)
- mouseleave: Regresa con ease elastic

---

### 9. **Ripple Effect** ⭐⭐
**Ubicación:** Botón principal "Reservar ahora"

**Descripción:**
- Efecto de onda al hacer click
- Muy popular en Material Design
- Feedback visual instantáneo

**Cómo usar:**
```html
<button data-ripple>Click me</button>
```

---

## 🎨 Personalización de Colores

El scrollbar personalizado usa los colores de la marca:

```css
::-webkit-scrollbar-thumb {
  background: #2d5016; /* forest color */
}
```

---

## 🚀 Cómo Usar

### Inicialización Automática

Las animaciones se inicializan automáticamente al cargar la página gracias al script en `Layout.astro`:

```typescript
import { initAnimations } from '../scripts/animations';

document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});
```

### Agregar Efecto Magnetic a Nuevos Botones

```html
<a href="#" data-magnetic>Mi Botón Magnético</a>
```

### Agregar Efecto Ripple a Nuevos Botones

```html
<button data-ripple>Mi Botón con Ripple</button>
```

### Agregar Contador Animado

```html
<span data-counter="mi-numero">1000</span>
```

Luego en `animations.ts`:
```typescript
{ selector: '[data-counter="mi-numero"]', endValue: 1000, suffix: '' }
```

---

## 📱 Responsive

Todas las animaciones están optimizadas para:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

ScrollTrigger se recalcula automáticamente en resize.

---

## ⚡ Performance

### Optimizaciones implementadas:

1. **will-change:** Aplicado a elementos animados
2. **transform3d:** GPU acceleration
3. **backface-visibility: hidden:** Previene flickering
4. **ScrollTrigger refresh:** Auto-refresh en resize

### CSS Performance Helpers:

```css
section {
  will-change: transform, opacity;
}

[data-magnetic], [data-counter] {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

---

## 🔧 Mantenimiento

### Cleanup para SPAs

Si usas navegación sin recargar página:

```typescript
import { cleanupAnimations } from './scripts/animations';

// Antes de cambiar de página
cleanupAnimations();
```

### Refresh Manual

Si cambias el DOM dinámicamente:

```typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

ScrollTrigger.refresh();
```

---

## 📚 Archivos Relacionados

- `src/scripts/animations.ts` - Archivo principal de animaciones
- `src/scripts/magnetic-button.ts` - Efectos de botones interactivos
- `src/styles/global.css` - Estilos CSS para animaciones
- `src/layouts/Layout.astro` - Inicialización

---

## 🎯 Impacto Visual

**Antes:** Sitio estático sin animaciones
**Después:**
- ✅ Experiencia premium y profesional
- ✅ Feedback visual en todas las interacciones
- ✅ Sensación de profundidad con parallax
- ✅ Engagement aumentado con counters animados
- ✅ Botones interactivos que "responden" al usuario

---

## 💡 Tips para el Cliente

1. **Hero Parallax:** El efecto más impactante - primero que ve el usuario
2. **Counters:** Los números que suben capturan mucha atención
3. **Magnetic Buttons:** Efecto premium que diferencia tu sitio
4. **Section Reveals:** Mantiene al usuario enganchado mientras scrollea

---

## 🔗 Recursos Útiles

- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases/)

---

**Desarrollado con ❤️ usando GSAP y ScrollTrigger**
