const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      optimization: false,
      outputHashing: 'none',
      // generatePackageJson: true,
      generatePackageJson: false, // Set to false to avoid generating package.json in dist to avoid Error: Pruned lock file creation failed. The following package was not found in the root lock file: @packages/config@* during the build process.
    })
  ],
};
