const paths = require('../configs/paths');
const packager = require('electron-packager');
const argv = require('minimist')(process.argv.slice(1));
const package = require(`${paths.APP}/package.json`);

const APP_NAME = package.name;
const VERSION = package.version;
const PLATFORM = 'darwin' || argv.platform;
const ARCH = 'x64' || argv.arch;

packager({
  name: APP_NAME,
  buildVersion: VERSION,
  platform: PLATFORM,
  dir: paths.DIST,
  out: paths.CACHE_BUILD,
  arch: ARCH,
  asar: true,
  prune: true,
  overwrite: true,
  all: false,
  icon: `${paths.BUILD_ASSENTS}/app.icns`
});
