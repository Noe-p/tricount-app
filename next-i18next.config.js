const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    ns: ['common'],
    defaultNs: 'common',
  },
  localePath: path.resolve('./src/i18n/local'),
};
