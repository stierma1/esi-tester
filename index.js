var builder = require("./esi-gammar-builder");
var fs = require("fs");
var path = require("path");
var jison = require("jison");

var builders = [
    function buildValidatorGrammar() {
        return {
            name: "validator",
            grammar: builder.fillActions()
        };
    },
    function buildDivReporterGrammar(){
        return {
          name: "div-reporter",
          grammar: builder.fillActions(null, {
            divElement: "{console.log('Closing div tag missing from line: ' + yylineno + '\\nGot:' + yy.lexer.pastInput() + '\\nLookahead: ' + yy.lexer.upcomingInput() + '\\n\\n' )}"
          })
        }
    },
    function buildTolerantValidatorGrammar() {
        return {
            name: "tolerant-validator",
            grammar: builder.fillActions(null, {
                divElement: "{$$ = $1 + $2 + $3 + $4 + $5}"
            })
        }
    },

    function buildTolerantGenericActionGrammar() {
        return {
            name: "tolerant-generic-actions",
            grammar: builder.buildGenericActions({
                divElement: "{$$ = $1 + $2 + $3 + $4 + $5}"
            })
        }
    },

    function buildGenericActionsGrammar() {
        return {
            name: "generic-actions",
            grammar: builder.buildGenericActions()
        }
    },
    require("./grammar-builders/html-ast"),
    require("./grammar-builders/html-ast").tolerant
]

for (var i in builders) {
    var construct = builders[i]();
    fs.writeFileSync(path.join(__dirname, "./parser-grammars/" + construct.name + ".y"), construct.grammar);
    var generator = new jison.Generator(construct.grammar, {});
    fs.writeFileSync(path.join(__dirname, "./parsers/" + construct.name + ".js"), generator.generate());
}
