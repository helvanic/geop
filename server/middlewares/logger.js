//Dependencies
var log = require('../Tools/log');

module.exports = function(request, response, next){
    var start = +new Date();
    var stream = process.stdout;
    var url = request.url;
    var methode = request.method;

    response.on('finish', function(){
      var duration = +new Date() - start;
      console.log(log.blue(methode) + ' to ' + log.error(url) + '\ntook '+ log.info(duration + ' ms'))
    });
    next();
}
