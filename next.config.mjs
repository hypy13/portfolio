const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
    turbopack: {
        root: "/home/hossein/Documents/projects/hypy-frontend/"
    },
    output: 'standalone',
}

export default nextConfig
