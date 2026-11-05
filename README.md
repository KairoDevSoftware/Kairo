# Kairo — sitio web oficial

Sitio estático de **Kairo** (回路, "circuito"): software a medida, web, servidores y soporte.
HTML5 + CSS3 + JavaScript puro, sin frameworks ni paso de build. Listo para GitHub Pages.

## Estructura

```
index.html        Página principal (todas las secciones)
404.html          Página de error
assets/css/       styles.css (tokens de marca en :root)
assets/js/        main.js (menú, animaciones, terminal, formulario → WhatsApp)
assets/fonts/     Outfit (Regular y Bold), servida localmente
assets/img/       Logos SVG, favicon, og-image
robots.txt, sitemap.xml, .nojekyll
```

## Ver en local

Abre `index.html` en el navegador (doble clic). No necesita servidor.

## Publicación (Cloudflare Pages)

Publicada en **https://kairodev.pages.dev/** (proyecto `kairodev` en la cuenta de Cloudflare de Kairo, conectado al repositorio `KairoDevSoftware/Kairo`, rama `main`, carpeta raíz, sin comando de build). Cada `git push` a `main` actualiza la web en uno o dos minutos.

### Al comprar el dominio propio

1. En Cloudflare: proyecto `kairodev` → **Custom domains** → agregar el dominio (por ejemplo `kairodev.com`).
2. Cambiar `https://kairodev.pages.dev/` por `https://<dominio>/` en `index.html`, `robots.txt` y `sitemap.xml`.
3. `kairodev.pages.dev` sigue funcionando; no hace falta tocar `404.html` (usa `<base href="/">`).

## Editar

- **Precios:** sección `#precios` de `index.html` (propuesta pendiente de confirmar por los socios).
- **WhatsApp:** constante `WA_NUMBER` en `assets/js/main.js` y enlaces `wa.me` en `index.html`.
- **Colores:** variables en `:root` de `assets/css/styles.css`.

## Pendiente

- Comprar dominio propio y pasar la web a una organización de Kairo en GitHub.
- Confirmar precios.
- Agregar proyectos reales con permiso de los clientes.
- Enlaces de Facebook y TikTok cuando existan.
- Cambiar el número de WhatsApp por el chip de Kairo.
