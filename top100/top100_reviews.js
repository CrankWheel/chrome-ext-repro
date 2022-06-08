// This uses chrome-webstore from https://github.com/simov/chrome-webstore
// git clone it to the folder chrome-webstore in the same directory.
var webstore = require('./chrome-webstore');

(async () => {
  var reviews = await webstore.reviews({
    id: process.argv[2], count: 20, locale: 'en', sort: 'recent'
  })
  console.log(reviews)
})();
