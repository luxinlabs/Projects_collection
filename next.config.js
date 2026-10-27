/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep review builds separate from an already-running development preview.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

module.exports = nextConfig
