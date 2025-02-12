/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['img.republicworld.com', 'koreabizwire.com'],
  },
};

export default nextConfig;
