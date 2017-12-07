var siteConfig = require('../configs/site.config.js');
var userConfig = require('../configs/user.config.js');
var casperSettings = require('../configs/casper-settings.js');

console.log(siteConfig.siteURL);

// casper.options.verbose = true;
// casper.options.logLevel = "debug";
// casper.on('http.status.404', function(resource) {
//     this.log('Hey, this one is 404: ' + resource.url, 'warning');
// });
// casper.on('http.status.200', function(resource) {
//     this.log('Hey, this one is 200: ' + resource.url, 'warning');
// });
casperSettings.clearScreenshots();
casperSettings.InitializeCustomFunctions();
casper.test.done();
