/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // السماح لصور Unsplash
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // السماح للصور المؤقتة
      },
    ],
  },
};

export default nextConfig;