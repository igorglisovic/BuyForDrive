/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        pathname: '**',
      },
    ],
  },
  // webpack(config) {
  //   config.experiments = {
  //     ...config.experiments,
  //     topLevelAwait: true,
  //   }
  //   return config
  // },
}

module.exports = nextConfig
