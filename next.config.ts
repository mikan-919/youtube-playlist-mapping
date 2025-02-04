import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Ignore node-specific modules when bundling for the browser
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };
    // config.module.rules.push({
    // loader: 'worker-loader',
    // options: {
    // inline: true,
    // name: 'static/[hash].worker.js',
    // publicPath: '/_next/',
    // },
    // });
    return config;
  },
};

export default nextConfig;
