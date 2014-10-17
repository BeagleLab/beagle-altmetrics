#!/usr/bin/env node

if (process.argv.length < 2) {
  console.error("Usage: " + process.argv[1] + " <doi>")
  process.exit(-1)
}

var altmetrics = require('./index')

// parse input
var doi = process.argv[2]

// pretty printing.
var pretty = function (data) {
  // data is a json object
  return JSON.stringify(data, undefined, 2)
}

// make call as a callback
altmetrics.getDataFromDoi(doi, function(err, data) {
  if (err != null) {
    console.error(err)
    process.exit(-1)
  }

  data = pretty(data)
  process.stdout.write(data)
})
