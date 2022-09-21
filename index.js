#!/usr/bin/env/ node
const fs = require('fs')
const path = require('path')
const { createSass } = require('./create-sass-app')

const CURR_DIR = process.cwd()

let TARGET_PATH = null
let USE_CURRENT_DIR = false

// IF THE USER HAS PASSED A PATH AS AN ARGUMENT, USE THAT
// OTHERWISE, USE THE CURRENT DIRECTORY
if (process.argv[2]) {
  TARGET_PATH = path.join(CURR_DIR, process.argv[2])
  // IF THE TARGET PATH EXIST, THROW AN ERROR
  if (fs.existsSync(TARGET_PATH)) {
    // TODO: support overwriting the directory options -f, --force
    // TODO: use commander to handle the arguments
    console.log('Target path already exists')
    process.exit(1)
  }
} else {
  TARGET_PATH = CURR_DIR
  USE_CURRENT_DIR = true
}

// TODO: use chalk to color the output
console.log('Creating new project in', TARGET_PATH)

// CREATE THE TARGET DIRECTORY
if (!USE_CURRENT_DIR) {
  fs.mkdirSync(TARGET_PATH)
}

createSass(TARGET_PATH)

// CHANGE THE CURRENT DIRECTORY TO THE TARGET DIRECTORY
if (!USE_CURRENT_DIR) {
  process.chdir(TARGET_PATH)
}