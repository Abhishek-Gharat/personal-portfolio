/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Turbopack root configuration
  turbopack: {
    root: __dirname,
  },
};
