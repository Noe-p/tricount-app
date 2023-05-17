const { i18n } = require('./next-i18next.config');
const runtimeCaching = require('next-pwa/cache');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  i18n,
  // distDir: 'build',
  staticPageGenerationTimeout: 20000,
  images: {
    domains: ['hatrabbits.com'],
  },
});
