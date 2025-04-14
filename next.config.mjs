/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_HOST: "127.0.0.1",
        DB_USER: "next-blog",
        DB_PWD: "8998",
        DB_NAME: "next-blog",
        CONNECTION_LIMIT: 10
    }
};

export default nextConfig;
