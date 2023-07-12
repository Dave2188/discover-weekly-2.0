
/** @type {import('next').NextConfig} */
const nextConfig = { 
  env: {
    customKey: 'my-value',
  },
   experimental: {
    serverActions: true,

  },}

module.exports = nextConfig