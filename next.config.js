/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["icon-library.com", "www.wifo.ac.at","res.cloudinary.com", "rangurura.research-leagues.com", "http://rangurura.research-leagues.com"],
    // unoptimized: true
  },
  // distDir: "output",
  // output: "export"
};

module.exports = nextConfig;

//Todo: configure app subdomains 

// async rewrites() {
//     return [
//       {
//         source: '/login/:path*',
//         destination: 'http://login.localhost:5400/:path*',
//       },
//       {
//         source: '/forum/:path*',
//         destination: 'http://forum.localhost:5400/:path*',
//       },
//     ];
//   }
