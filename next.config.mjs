/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Avoid ESLint 9 + FlatCompat serialization error during production builds.
    // Run `npm run lint` separately in CI or locally.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
