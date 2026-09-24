/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// En GitHub Pages, el proyecto suele publicarse en https://<usuario>.github.io/<nombre-repo>/
// Si tu repositorio se llama 'punto-nexus', puedes establecer la variable de entorno o reemplazar el string:
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // 1. Habilita la exportación estática HTML/CSS/JS (genera la carpeta 'out')
  output: 'export',

  // 2. Desactiva el servidor de optimización de imágenes (imprescindible en hosting estático)
  images: {
    unoptimized: true,
  },

  // 3. Genera rutas con trailing slash (/explorar/index.html en lugar de /explorar.html)
  // Crucial para evitar errores 404 al recargar rutas en GitHub Pages
  trailingSlash: true,

  // 4. Prefijo base si se despliega en un subdirectorio de GitHub Pages (ej. /punto-nexus)
  basePath: repoName,
  assetPrefix: repoName ? `${repoName}/` : undefined,

  // 5. Soporte para React Strict Mode
  reactStrictMode: true,
};

export default nextConfig;
