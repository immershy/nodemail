FileListCache = require './file-list-cache'
SharedFileManager = require './shared-file-manager'

_ = require 'underscore'
fs = require 'fs-plus'
path = require 'path'
{EventEmitter} = require 'events'


# The application's singleton class.
#
# It's the entry point into the N1 application and maintains the global state
# of the application.
#
module.exports =
class Application
  _.extend @prototype, EventEmitter.prototype

  # Public: The entry point into the N1 application.
  @open: (options) ->
    createApplication = -> new Application(options)
    createApplication()

  resourcePath: null
  version: null


  constructor: (options) ->
    {@resourcePath, @configDirPath, @version, @devMode, @specMode, @safeMode} = options
    @fileListCache = new FileListCache(options)
    # Normalize to make sure drive letter case is consistent on Windows
    @resourcePath = path.normalize(@resourcePath) if @resourcePath
    global.application = this
    @sharedFileManager = new SharedFileManager()

    Config = require '../src/config'
    @config = new Config({@configDirPath, @resourcePath})
    @config.load()

    initializeInBackground = options.background ? false
    @_databasePhase = 'setup'
