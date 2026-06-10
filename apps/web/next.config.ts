import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@capitalos/shared'],
  outputFileTracingRoot: require('path').join(__dirname, '../../'),
};

export default nextConfig;
