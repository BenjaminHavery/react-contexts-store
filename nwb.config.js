
const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  webpack: {
    aliases: {
      'react-contexts-store': path.resolve(__dirname, 'src/index.js'),
      'Demo': path.resolve(__dirname, 'demo/src/'),
      'Components': path.resolve(__dirname, 'demo/src/components/'),
      'Pages': path.resolve(__dirname, 'demo/src/pages/'),
      'Styles': path.resolve(__dirname, 'demo/src/styles/'),
      'Store': path.resolve(__dirname, 'demo/src/store/'),
      'Util': path.resolve(__dirname, 'demo/src/util/'),
    },
    copy: [
      { from: 'demo/src/public' },
    ],
    extra: {
      resolve: {
        mainFiles: ['index'],
      },
    },
  },
}
