global.shellStartTime = Date.now()
fs = require 'fs-plus'
path = require 'path'
mkdirp = require 'mkdirp'

start = ->
  args = parseArgs()
  console.log("args:"+JSON.stringify(args))
  configDirPath = setupConfigDir(args)
  args.configDirPath = configDirPath
  setupCompileCache(configDirPath)

  Application = require "./application"
  Application.open(args)

setupConfigDir = (args) ->
  configDirPath = args.configDirPath
  mkdirp.sync(configDirPath)
  process.env.EMAIL_HOME = configDirPath
  return configDirPath

setupCompileCache = (configDirPath) ->
  compileCache = require('../src/compile-cache')
  compileCache.setHomeDirectory(configDirPath)

parseArgs = ->
  version = "1.0.0";

  devMode = false
  specMode = false
  safeMode = false
  background = false
  configDirPath = path.resolve(path.dirname(path.dirname(__dirname)),".email")
  resourcePath = path.resolve(path.dirname(path.dirname(__dirname)))

  return {version, devMode, background, specMode, safeMode, configDirPath, resourcePath}

start()
