// Learn more https://docs.expo.dev/guides/monorepos
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const { FileStore } = require('metro-cache')
const path = require('path')

// Create the default Expo config for Metro
// This includes the automatic monorepo configuration for workspaces
// See: https://docs.expo.dev/guides/monorepos/#automatic-configuration
const config = getDefaultConfig(__dirname)

// You can configure it manually as well, the most important parts are:
// const projectRoot = __dirname;
// const workspaceRoot = path.join(__dirname, '..', '..');
// #1 - Watch all files within the monorepo
// config.watchFolders = [workspaceRoot];
// #2 - Try resolving with project modules first, then hoisted workspace modules
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(workspaceRoot, 'node_modules'),
// ];

// Use turborepo to restore the cache when possible
config.cacheStores = [
  new FileStore({
    root: path.join(__dirname, 'node_modules', '.cache', 'metro'),
  }),
]

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'hono/client') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(
        path.join(__dirname).split('apps')[0],
        'node_modules/hono/dist/client/index.js'
      ),
    }
  }
  return context.resolveRequest(context, moduleName, platform)
}

module.exports = withNativeWind(config, { input: './global.css' })
