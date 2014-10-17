#!/usr/bin/env node

if (process.argv.length < 2) {
  console.error("Usage: " + process.argv[1] + " <doi>")
  process.exit(-1)
}

var through2 = require('through2')
var altmetrics = require('./index')

// parse input
var doi = process.argv[2]

var pretty = through2.obj(function (data, enc, done) {
  data = JSON.stringify(data, undefined, 2)
  this.push(data)
  done()
})

altmetrics.getDataFromDoiStream(doi)
  .pipe(pretty)
  .pipe(process.stdout)
