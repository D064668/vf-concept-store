/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // hide Next.js's little development badge (bottom-left), so screen shares look like the real app
  devIndicators: false,
};
export default nextConfig;
