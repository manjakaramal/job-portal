import { default as withPWA } from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */

// PWA configuration
const withPWAConfig = withPWA({
    dest: "public", // Directory where the service worker will be generated
    disable: false, // Ensure that PWA features are enabled
    cacheOnFrontEndNav: true, // Enable additional route caching when users navigate through pages with next/link
    aggressiveFrontEndNavCaching: true, // Cache every <link rel="stylesheet" /> and <script /> on frontend navigation. Requires cacheOnFrontEndNav to be enabled
    reloadOnOnline: true, // Reload the app when it has gone back online
    workboxOptions: {
        disableDevLogs: true // Disable Workbox logs in development mode for cleaner console output
    },
    cacheStartUrl: true, // Cache the start URL for faster initial load and offline availability
});

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                pathname: '**', // Match all paths 
            },
        ],
    },
};



export default withPWAConfig(nextConfig);
