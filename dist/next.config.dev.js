"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  env: {
    customKey: 'my-value'
  },
  experimental: {
    serverActions: true
  }
};
module.exports = nextConfig;