/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite cargar fotos desde cualquier host HTTPS. Necesario para que
    // puedas usar URLs de Supabase Storage, Cloudinary, Imgur, Drive, etc.
    // sin tener que agregar dominios uno por uno.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
