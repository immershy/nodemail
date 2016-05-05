// Generated by CoffeeScript 1.10.0
(function() {
  var fs, mkdirp, parseArgs, path, setupCompileCache, setupConfigDir, start;

  global.shellStartTime = Date.now();

  fs = require('fs-plus');

  path = require('path');

  mkdirp = require('mkdirp');

  start = function() {
    var Application, args, configDirPath;
    args = parseArgs();
    console.log("args:" + JSON.stringify(args));
    configDirPath = setupConfigDir(args);
    args.configDirPath = configDirPath;
    setupCompileCache(configDirPath);
    Application = require("./application");
    return Application.open(args);
  };

  setupConfigDir = function(args) {
    var configDirPath;
    configDirPath = args.configDirPath;
    mkdirp.sync(configDirPath);
    process.env.EMAIL_HOME = configDirPath;
    return configDirPath;
  };

  setupCompileCache = function(configDirPath) {
    var compileCache;
    compileCache = require('../src/compile-cache');
    return compileCache.setHomeDirectory(configDirPath);
  };

  parseArgs = function() {
    var background, configDirPath, devMode, resourcePath, safeMode, specMode, version;
    version = "1.0.0";
    devMode = false;
    specMode = false;
    safeMode = false;
    background = false;
    configDirPath = path.resolve(path.dirname(path.dirname(__dirname)), ".email");
    resourcePath = path.resolve(path.dirname(path.dirname(__dirname)));
    return {
      version: version,
      devMode: devMode,
      background: background,
      specMode: specMode,
      safeMode: safeMode,
      configDirPath: configDirPath,
      resourcePath: resourcePath
    };
  };

  start();

}).call(this);