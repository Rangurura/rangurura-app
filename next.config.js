/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    async rewrites() {
        return [
          {
            source: '/login/:path*',
            destination: 'http://login.localhost:5400/:path*',
          },
          {
            source: '/forum/:path*',
            destination: 'http://forum.localhost:5400/:path*',
          },
        ];
      }
}

module.exports = nextConfig
