const path = require('path');
const { execSync } = require('child_process');
const fse = require('fs-extra');
const paths = require('../configs/paths');
const package = require(`${paths.APP}/package.json`);

if (fse.existsSync(paths.CACHE_BUILD)) { fse.removeSync(paths.CACHE_BUILD) }
if (fse.existsSync(paths.BIN)) { fse.removeSync(paths.BIN) }

// Create .build folder
if (!fse.existsSync(paths.CACHE_BUILD)) {
  fse.mkdirSync(paths.CACHE_BUILD);
}

// Package app
try {
  const log = execSync(`node ${paths.BUILD}/scripts/package.js`).toString();
  console.log(log);
} catch (error) {
  console.log(error)
}

// Create dmg installer
try {
  const log = execSync(`node ${paths.BUILD}/scripts/create-installer.js`).toString();
  console.log(log);
} catch (error) {
  console.log(error)
}

// Create bin folder
if (!fse.existsSync(paths.BIN)) {
  fse.mkdirSync(paths.BIN);
}

fse.copySync(
  `${paths.CACHE_BUILD}/${package.name}-darwin-x64/${package.name}.app`,
  `${paths.BIN}/darwin/${package.name}.app`,
  { overwrite: true }
);

fse.copySync(
  `${paths.CACHE_BUILD}/${package.name}.dmg`,
  `${paths.BIN}/darwin/${package.name}.dmg`,
  { overwrite: true }
);

if (fse.existsSync(paths.CACHE_BUILD)) { fse.removeSync(paths.CACHE_BUILD) }
