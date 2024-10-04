/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.GITHUB_ACTION ? 'export' : undefined,
};

export default nextConfig;
