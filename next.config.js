/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    domains: ["api.dicebear.com"],
    loader: "custom",
    loaderFile: "./src/libs/imageLoader.ts"
  }
};

module.exports = nextConfig;
