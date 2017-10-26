const paths = require('../configs/paths');
const package = require(`${paths.APP}/package.json`);
const createDMG = require('electron-installer-dmg');

function logProccess(error) {
  error && console.log(error);
}

createDMG({
  name: package.name,
  appPath: `${paths.CACHE_BUILD}/${package.name}-darwin-x64/${package.name}.app`,
  out: paths.CACHE_BUILD,
  overwrite: true
}, logProccess);
