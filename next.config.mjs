// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        optimizePackageImports: ['shiki']
    },
};

export default nextConfig;
