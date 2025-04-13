const path = require('path')
const basePath = path.join(__dirname).split('apps')[0]

module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'better-auth/react': path.resolve(
              basePath,
              'node_modules/better-auth/dist/client/react/index.cjs'
            ),
            'better-auth/client/plugins': path.resolve(
              basePath,
              'node_modules/better-auth/dist/client/plugins/index.cjs'
            ),
            '@better-auth/expo/client': path.resolve(
              basePath,
              'node_modules/@better-auth/expo/dist/client.cjs'
            ),
          },
        },
      ],
    ],
  }
}
