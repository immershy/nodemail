window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {}

require("babel-polyfill");
require("../window/main")

var path = require('path');
var mkdirp = require('mkdirp');
global.document = window.document
global.navigator = window.navigator
global.HTMLElement = window.HTMLElement
global.gui = require('nw.gui')

function setupWindow () {
  var CompileCache = require('../src/compile-cache')
  setupCsonCache(CompileCache.getCacheDirectory())
  require('../src/secondary-window-bootstrap')
  require('../src/window-bootstrap')
}

function setupConfigDir() {
  var defaultConfigDir = path.join(process.cwd(), '.email');
  mkdirp.sync(defaultConfigDir);
  process.env.EMAIL_HOME = defaultConfigDir;
  return defaultConfigDir;
};

function setupCsonCache (cacheDir) {
  require('season').setCacheDir(path.join(cacheDir, 'cson'))
}

window.onload = function() {
  try {
    setupWindow();
  }
  catch (error) {
    console.error(error);
  }
}
