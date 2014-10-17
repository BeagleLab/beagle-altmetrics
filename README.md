# beagle-altmetrics


## Usage

### Callbacks:

```js
var beagleAltmetrics = require("beagle-altmetrics")
var doi = "10.1371/journal.pone.0077056"

beagleAltmetrics.getDataFromDoi(doi, function(err, data) {
  if (err != null) {
    console.error(err)
    process.exit(-1)
  }

  // data is json
  console.log(data)
})
```

### Streams:

```js
var beagleAltmetrics = require("beagle-altmetrics")
var doi = "10.1371/journal.pone.0077056"

var stream = beagleAltmetrics.getDataFromDoiStream(doi)
// stream.pipe() into whatever
})
```

### CLI

Examples of how to use the interface of this module:

- [cli-callback.js](cli-callback.js) - for async callbacks
- [cli-stream.js](cli-stream.js) - for streams

Run them like:

```sh
./cli-stream.js "10.1371/journal.pone.0077056"
./cli-callback.js "10.1371/journal.pone.0077056"
```
