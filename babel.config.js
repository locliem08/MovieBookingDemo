module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Add here...
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@redux': './src/redux',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@types': './src/types',
          '@navigation': './src/navigation',
          // Thêm các alias khác tùy theo cấu trúc dự án của bạn
        },
      },
    ],
    'react-native-reanimated/plugin' // react-native-reanimated/plugin has to be listed last.
  ],
};
