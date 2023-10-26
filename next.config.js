/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals = [
      ...config.externals,
      "tree-sitter",
      "tree-sitter-c",
      "tree-sitter-rust",
    ];
    config.module.rules.push({
      test: /\.scm/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
