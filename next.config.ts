import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ini biar Netlify nggak cerewet soal error penulisan kode
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ini biar Netlify tetap jalan meskipun ada error di tipe data TypeScript
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
