/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
        protocol: "https",
      },
      {
        hostname: "mfgadjucjxcfjhuaebjq.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
