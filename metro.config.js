const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Agregamos un alias para resolver "missing-asset-registry-path"
defaultConfig.resolver.extraNodeModules = {
  'missing-asset-registry-path': require.resolve('react-native/Libraries/Image/AssetRegistry'),
};


// defaultConfig.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'cjs']; 


module.exports = defaultConfig;
