/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'picsum.photos'
    },
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    }
  ],
  },
  eslint: {
    // Solo en producción, ignora errores de ESLint durante el build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
