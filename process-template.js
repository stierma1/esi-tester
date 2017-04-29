
function buildParserProcessor(parserModule){
  return `
  var parserModule = require('./${parserModule}');
  var preprocess = require('../pre-processor');

  exports.parse = function (...args) {
    var [data, ...opts] = args;
    var preProced = preprocess(data);
    return parserModule.parse.apply(parserModule.parser, [preProced, ...opts]);
  };
  exports.main = function commonjsMain(args) {
      if (!args[1]) {
          console.log('Usage: '+args[0]+' FILE');
          process.exit(1);
      }
      var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
      return exports.parse(source);
  };
  if (typeof module !== 'undefined' && require.main === module) {
    exports.main(process.argv.slice(1));
  }
  `
}

module.exports = buildParserProcessor;
