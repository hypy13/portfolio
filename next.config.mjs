const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },

    output: 'standalone',
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
}

export default nextConfig
