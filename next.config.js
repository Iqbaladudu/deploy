/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    url: "https://annotation.aiforindonesia.com/api/v1",
    engine: "http://127.0.0.1:5000/",
    image: "https://annotation.aiforindonesia.com",
  },
};

module.exports = nextConfig;
