// get every tree-sitter package from package.json
const fs = require("fs");

const treeSitterPackages = fs.readdirSync("node_modules").filter((name) => {
  return name.startsWith("tree-sitter");
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeServerReact: true,
    optimizeCss: true,
    turbo: {
      rules: {
        "*.scm": ["raw-loader"],
        "*.node": [""],
      },
    },
  },
  webpack: (config) => {
    config.externals = [...config.externals, ...treeSitterPackages];
    config.module.rules.push({
      test: /\.scm/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
