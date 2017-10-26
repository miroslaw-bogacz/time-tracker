const APP = process.cwd();
const DIST = `${APP}/dist`;
const BUILD = `${APP}/build`;
const BIN = `${APP}/bin`;
const BUILD_ASSENTS = `${BUILD}/assets`;
const CACHE_BUILD = `${APP}/.build`;

module.exports = { APP, CACHE_BUILD, DIST, BIN, BUILD, BUILD_ASSENTS };
