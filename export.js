
module.exports = {
  preprocessor: require("./pre-processor").parse,
  DIV_REPORTER:require("./parsers/process-div-reporter").parse,
  HTML_AST: require("./parsers/process-html-ast").parse,
  GENERIC: require("./parsers/process-generic-actions").parse,
  VALIDATOR: require("./parsers/process-validator").parser,
  TOLERANT_GENERIC: require("./parsers/process-tolerant-generic-actions").parse,
  TOLERANT_VALIDATOR: require("./parsers/process-tolerant-validator").parser,
  TOLERANT_HTML_AST: require("./parsers/process-tolerant-html-ast").parser,
  RAW:{
    DIV_REPORTER:require("./parsers/div-reporter").parse,
    HTML_AST: require("./parsers/html-ast").parse,
    GENERIC: require("./parsers/generic-actions").parse,
    VALIDATOR: require("./parsers/validator").parser,
    TOLERANT_GENERIC: require("./parsers/tolerant-generic-actions").parse,
    TOLERANT_VALIDATOR: require("./parsers/tolerant-validator").parser,
    TOLERANT_HTML_AST: require("./parsers/tolerant-html-ast").parser,
  }
}
