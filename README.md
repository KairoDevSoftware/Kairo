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

## Publicar en GitHub Pages

Publicada en **https://darkcodeknight25.github.io/kairo/** (repositorio `DarkCodeKnight25/kairo`, rama `main`, carpeta raíz). Cada `git push` a `main` actualiza la web en uno o dos minutos.

### Al comprar el dominio propio

1. Crear el archivo `CNAME` con el dominio (por ejemplo `kairo.com.pe`).
2. Cambiar `https://darkcodeknight25.github.io/kairo/` por `https://<dominio>/` en `index.html`, `robots.txt` y `sitemap.xml`.
3. En `404.html`, cambiar `<base href="/kairo/">` por `<base href="/">`.
4. En el panel del dominio, apuntar los registros DNS a GitHub Pages y activar **Enforce HTTPS** en Settings → Pages.

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
