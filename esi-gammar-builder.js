var actionList = require("./action-list");

function fillActions(actions, errors) {
	var actions = actions || {};
	var errors = errors || {};
	return `/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

"<![endif]-->"        return "<![endif]-->"
"<!--[if lte IE 8]>"  return "<!--[if lte IE 8]>"
[ \\n\\t\\r]               return 'White_Space_Char'
"-->"                 return "-->"
"<!--"                return "<!--"
"<!DOCTYPE"             return "<!DOCTYPE"
"<div"                  return "<div"
"</div"                 return "</div"
"<esi:include"         return '<esi:include'
"<esi:return"         return '<esi:return'
"<esi:assign"          return '<esi:assign'
"<esi:comment"          return "<esi:comment"
"<esi:choose"          return '<esi:choose'
"<esi:when"            return '<esi:when'
"<esi:vars"             return "<esi:vars"
"<esi:otherwise"        return "<esi:otherwise"
"</esi:otherwise"       return "</esi:otherwise"
"<esi:remove"           return "<esi:remove"
"</esi:remove"          return "</esi:remove"
"<esi:eval"             return "<esi:eval"
"<esi:function"             return "<esi:function"
"</esi:function"            return "</esi:function"
"<esi:foreach"             return "<esi:foreach"
"</esi:foreach"            return "</esi:foreach"
"<esi:inline"             return "<esi:inline"
"<esi:try"                     return "<esi:try"
"<esi:attempt"                   return "<esi:attempt"
"<esi:except"             return "<esi:except"
"</esi:try"             return "</esi:try"
"</esi:attempt"             return "</esi:attempt"
"</esi:except"          return "</esi:except"
"</esi:inline"             return "</esi:inline"
"</esi:vars"            return "</esi:vars"
"</esi:choose"          return '</esi:choose'
"</esi:when"            return '</esi:when'
"<script"             return "<script"
"</script"              return "</script"
"<SCRIPT"             return "<SCRIPT"
"</SCRIPT"              return "</SCRIPT"
"<style"                return "<style"
"</style"               return "</style"
"<area"               return "<area"
"<base"               return "<base"
"<br"                 return "<br"
"<col"                return "<col"
"<command"            return "<command"
"<embed"              return "<embed"
"<hr"                 return "<hr"
"<img"                return "<img"
"<input"             return "<input"
"<link"              return "<link"
"<meta"               return "<meta"
"<param"              return "<param"
"<source"             return "<source"
[0-9]                 return 'ASCII_Digit'
[A-Za-z]              return 'ASCII_Initial_Char'
"-"                   return 'HYPHON'
"</"                  return "</"
"/>"                  return "/>"
"<"                   return '<'
">"                   return '>'
"/"                   return '/'
"\\\\\\\\"                return 'FULLY_ESCAPED'
"\\\\"                  return 'ESCAPE_PUNC'
["]                  return 'DOUBLE_QUOTE'
[']                   return 'SINGLE_QUOTE'
":"                   return ':'
"="                   return '='
"\."                   return "DOT"
(.)                   return 'Unknown_Char'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start root

%% /* language grammar */

root
		: docTypeTag maybeHtmlDom EOF ${actions.root || "{}"}
		;

keyword
	: "<esi:assign"
	| "<esi:choose"
	| "<esi:comment"
	| "<esi:include"
	| "<esi:return"
	| "<esi:when"
	| "<esi:otherwise"
	| "</esi:otherwise"
	| "<!DOCTYPE"
	| "<script"
	| "<SCRIPT"
	| "</SCRIPT"
	| "<style"
	| "<esi:vars"
	| "<esi:inline"
	| "<esi:remove"
	| "</esi:remove"
	| "<esi:eval"
	| "<esi:function"
	| "</esi:function"
	| "<esi:foreach"
	| "</esi:foreach"
	| "<esi:try"
	| "<esi:attempt"
	| "<esi:except"
	| "</esi:try"
	| "</esi:attempt"
	| "</esi:except"
	| "</esi:inline"
	| "</esi:vars"
	| "</esi:choose"
	| "</esi:when"
	| "<div"
	| "</div"
	| "</script"
	| "</style"
	| "<area"
	| "<base"
	| "<br"
	| "<col"
	| "<command"
	| "<embed"
	| "<hr"
	| "<img"
	| "<input"
	| "<link"
	| "<meta"
	| "<param"
	| "<source"
	| "/>"
	| "</"
	| "<!--"
	| "<!--[if lte IE 8]>"
	| "<![endif]-->"
	| "-->"
	;

htmlVoidTagOpenings
	: "<area"
	| "<base"
	| "<br"
	| "<col"
	| "<command"
	| "<embed"
	| "<hr"
	| "<img"
	| "<input"
	| "<link"
	| "<meta"
	| "<param"
	| "<source"
	;

selfClosingEsiTagName
	: "<esi:assign"
	| "<esi:include"
	| "<esi:comment"
	| "<esi:return"
	| "<esi:eval"
	;

openEsiTagName
	: "<esi:choose"
	| "<esi:when"
	| "<esi:inline"
	| "<esi:vars"
	| "<esi:try"
	| "<esi:attempt"
	| "<esi:except"
	| "<esi:otherwise"
	| "<esi:remove"
	| "<esi:function"
	| "<esi:foreach"
	;

closeEsiTagName
	: "</esi:choose"
	| "</esi:when"
	| "</esi:inline"
	| "</esi:vars"
	| "</esi:try"
	| "</esi:attempt"
	| "</esi:except"
	| "</esi:otherwise"
	| "</esi:remove"
	| "</esi:function"
	| "</esi:foreach"
	;

escapedDQuote
		: ESCAPE_PUNC DOUBLE_QUOTE ${actions.escapedDQuote || "{}"}
		;

nonTagedString
	: /**/ ${actions.nonTagedStringEpsilon || "{}"}
	| nonTagedString White_Space_Char ${actions.nonTagedString || "{}"}
	| nonTagedString ESCAPE_PUNC ${actions.nonTagedString || "{}"}
	| nonTagedString "/" ${actions.nonTagedString || "{}"}
	| nonTagedString ":" ${actions.nonTagedString || "{}"}
	| nonTagedString "=" ${actions.nonTagedString || "{}"}
	| nonTagedString ASCII_Digit ${actions.nonTagedString || "{}"}
	| nonTagedString ASCII_Initial_Char ${actions.nonTagedString || "{}"}
	| nonTagedString Unknown_Char ${actions.nonTagedString || "{}"}
	| nonTagedString HYPHON ${actions.nonTagedString || "{}"}
	| nonTagedString SINGLE_QUOTE ${actions.nonTagedString || "{}"}
	| nonTagedString DOUBLE_QUOTE ${actions.nonTagedString || "{}"}
	| nonTagedString FULLY_ESCAPED ${actions.nonTagedString || "{}"}
	| nonTagedString DOT ${actions.nonTagedString || "{}"}
	;

escapedChar
		: ESCAPE_PUNC ">" ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC "<" ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC "/" ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC ":" ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC "=" ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC keyword ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC ESCAPE_PUNC ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC White_Space_Char ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC ASCII_Digit ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC ASCII_Initial_Char ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC Unknown_Char ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC HYPHON ${actions.escapedChar || "{}"}
		| ESCAPE_PUNC DOT ${actions.escapedChar || "{}"}
		;

escapedSQuote
		: ESCAPE_PUNC SINGLE_QUOTE ${actions.escapedSQuote || "{}"}
		;

anyNonDoubleQEscapeBreakingString
	: /**/ ${actions.anyNonDoubleQEscapeBreakingStringEpsilon || "{}"}
	| anyNonDoubleQEscapeBreakingString ">" ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString "<" ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString "/" ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString ":" ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString "=" ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString keyword ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString escapedDQuote ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString SINGLE_QUOTE ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString White_Space_Char ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString ASCII_Digit ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString ASCII_Initial_Char ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString Unknown_Char ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString escapedChar ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString FULLY_ESCAPED ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString HYPHON ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	| anyNonDoubleQEscapeBreakingString DOT ${actions.anyNonDoubleQEscapeBreakingString || "{}"}
	;

anyNonSingleQEscapeBreakingString
		: /**/ ${actions.anyNonSingleQEscapeBreakingStringEpsilon || "{}"}
		| anyNonSingleQEscapeBreakingString ">" ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString "<" ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString "/" ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString ":" ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString "=" ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString keyword ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString escapedSQuote ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString DOUBLE_QUOTE ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString White_Space_Char ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString ASCII_Digit ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString ASCII_Initial_Char ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString Unknown_Char ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString escapedChar ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString FULLY_ESCAPED ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString HYPHON ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		| anyNonSingleQEscapeBreakingString DOT ${actions.anyNonSingleQEscapeBreakingString || "{}"}
		;

escapedString
	: DOUBLE_QUOTE anyNonDoubleQEscapeBreakingString DOUBLE_QUOTE ${actions.escapedString || "{}"}
	| SINGLE_QUOTE anyNonSingleQEscapeBreakingString SINGLE_QUOTE ${actions.escapedString || "{}"}
	;

optionalWhiteSpaceString
	: /**/ ${actions.optionalWhiteSpaceStringEpsilon || "{}"}
	| whiteSpaceString ${actions.optionalWhiteSpaceString || "{}"}
	;

optionalSlash
	: /**/ ${actions.optionalSlashEpsilon || "{}"}
	| "/" ${actions.optionalSlash || "{}"}
	;

whiteSpaceString
	: White_Space_Char ${actions.whiteSpaceStringChar || "{}"}
	| whiteSpaceString White_Space_Char ${actions.whiteSpaceStringCharSeq || "{}"}
	;

unicodeAlphanumeric
	: ASCII_Digit ${actions.unicodeAlphanumericDigit || "{}"}
	| unicodeAlphanumeric ASCII_Digit ${actions.unicodeAlphanumericDigitSeq || "{}"}
	| ASCII_Initial_Char ${actions.unicodeAlphanumericInitial || "{}"}
	| unicodeAlphanumeric ASCII_Initial_Char ${actions.unicodeAlphanumericInitialSeq || "{}"}
	;

unicodeAlphaNumHyph
	: ASCII_Digit ${actions.unicodeAlphaNumHyphDigit || "{}"}
	| ASCII_Initial_Char ${actions.unicodeAlphaNumHyphInitial || "{}"}
	| unicodeAlphaNumHyph ASCII_Digit ${actions.unicodeAlphaNumHyphDigitSeq || "{}"}
	| unicodeAlphaNumHyph ASCII_Initial_Char ${actions.unicodeAlphaNumHyphInitialSeq || "{}"}
	| unicodeAlphaNumHyph HYPHON ASCII_Digit ${actions.unicodeAlphaNumHyphHyphenDigitSeq || "{}"}
	| unicodeAlphaNumHyph HYPHON ASCII_Initial_Char ${actions.unicodeAlphaNumHyphHyphenInitialSeq || "{}"}
	| unicodeAlphaNumHyph DOT ASCII_Digit ${actions.unicodeAlphaNumHyphHyphenDigitSeq || "{}"}
	| unicodeAlphaNumHyph DOT ASCII_Initial_Char ${actions.unicodeAlphaNumHyphHyphenInitialSeq || "{}"}
	;

initialFirstUnicodeAlphanumeric
	: ASCII_Initial_Char ${actions.initialFirstUnicodeAlphanumericInitial || "{}"}
	| ASCII_Initial_Char unicodeAlphanumeric ${actions.initialFirstUnicodeAlphanumericSeq || "{}"}
	;

initialFirstAlphaNumHyph
	: ASCII_Initial_Char ${actions.initialFirstAlphaNumHyphInitial || "{}"}
	| ASCII_Initial_Char unicodeAlphaNumHyph ${actions.initialFirstAlphaNumHyphSeq || "{}"}
	| ASCII_Initial_Char HYPHON unicodeAlphaNumHyph ${actions.initialFirstAlphaNumHyphHyphonSeq || "{}"}
	| ASCII_Initial_Char DOT unicodeAlphaNumHyph ${actions.initialFirstAlphaNumHyphHyphonSeq || "{}"}
	;

docTypeTag
	: /**/ ${actions.docTypeTagEspilon || "{}"}
	| "<!DOCTYPE" nonTagedString ">" ${actions.docTypeTag || "{}"}
	;

esiOpenTagHead
	: openEsiTagName attributeStartClose ${actions.esiOpenTagHead || "{}"}
	;

esiCloseTag
	: closeEsiTagName optionalWhiteSpaceString ">" ${actions.esiCloseTag || "{}"}
	;

esiSelfClosingTagHead
	: selfClosingEsiTagName attributeStartSelfClose ${actions.esiSelfClosingTagHead || "{}"}
	;

esiDomElement
	: esiSelfClosingTagHead ${actions.esiDomElementSelfClosing || "{}"}
	| esiOpenTagHead maybeHtmlDom esiCloseTag ${actions.esiDomElementOpenClose || "{}"}
	;

htmlOpenTagHead
	: "<" initialFirstUnicodeAlphanumeric attributeStartClose ${actions.htmlOpenTagHead || "{}"}
	;

htmlCloseTag
	: "</" initialFirstUnicodeAlphanumeric optionalWhiteSpaceString ">" ${actions.htmlCloseTag || "{}"}
	;

htmlSelfClosingTagHead
	: "<" initialFirstUnicodeAlphanumeric attributeStartSelfClose ${actions.htmlSelfClosingTagHead || "{}"}
	;

htmlVoidTagHead
		: htmlVoidTagOpenings attributeStartVoid ${actions.htmlVoidTagHead || "{}"}
		;

htmlComment
	: "<!--" maybeHtmlDom "-->" ${actions.htmlComment || "{}"}
	;

ieDirective
	: "<!--[if lte IE 8]>" maybeHtmlDom "<![endif]-->" ${actions.ieDirective || "{}"}
	;

maybeHtmlDom
	: nonTagedString ${actions.maybeHtmlDomNonTagedString || "{}"}
	| maybeHtmlDom divElement nonTagedString ${actions.maybeHtmlDomDivDomElement || "{}"}
	| maybeHtmlDom esiDomElement nonTagedString ${actions.maybeHtmlDomEsiDomElement || "{}"}
	| maybeHtmlDom htmlDomElement nonTagedString ${actions.maybeHtmlDomHtmlDomElement || "{}"}
	| maybeHtmlDom htmlComment nonTagedString ${actions.maybeHtmlDomHtmlCommentDomElement || "{}"}
	| maybeHtmlDom scriptTagElement nonTagedString ${actions.maybeHtmlDomScriptTagDomElement || "{}"}
	| maybeHtmlDom styleTagElement nonTagedString ${actions.maybeHtmlDomStyleDomElement || "{}"}
	| maybeHtmlDom ieDirective nonTagedString ${actions.maybeHtmlDomIEDirective || "{}"}
	;

htmlDomElement
	: htmlSelfClosingTagHead ${actions.htmlDomElementSelfClose || "{}"}
	| htmlVoidTagHead ${actions.htmlDomElementSelfClose || "{}"}
	| htmlOpenTagHead maybeHtmlDom htmlCloseTag ${actions.htmlDomElementOpenClose || "{}"}
	;

jsStringToken
	: White_Space_Char
	| "<!DOCTYPE"
	| "<!--"
	| "<!--[if lte IE 8]>"
	| "<![endif]-->"
	| "-->"
	| "<div"
	| "</div"
	| "<esi:eval"
	| "<esi:function"
	| "</esi:function"
	| "<esi:foreach"
	| "</esi:foreach"
	| "<esi:remove"
	| "</esi:remove"
	| "<esi:comment"
	| "<esi:include"
	| "<esi:return"
	| "<esi:assign"
	| "<esi:choose"
	| "<esi:when"
	| "<esi:otherwise"
	| "</esi:otherwise"
	| "<esi:vars"
	| "<esi:inline"
	| "<esi:try"
	| "<esi:attempt"
	| "<esi:except"
	| "</esi:try"
	| "</esi:attempt"
	| "</esi:except"
	| "</esi:inline"
	| "</esi:choose"
	| "</esi:when"
	| "</esi:vars"
	| htmlVoidTagOpenings
	| "<script"
	| "<SCRIPT"
	| "<style"
	| "</style"
	| ASCII_Digit
	| ASCII_Initial_Char
	| HYPHON
	| "</"
	| "/>"
	| "<"
	| ">"
	| "/"
	| FULLY_ESCAPED
	| ESCAPE_PUNC
	| DOUBLE_QUOTE
	| SINGLE_QUOTE
	| ":"
	| "="
	| Unknown_Char
	| DOT
	;

 jsString
	: /**/ ${actions.jsStringEpsilon || "{}"}
	| jsString jsStringToken ${actions.jsString || "{}"}
	;

scriptTagElement
	: "<script" scriptTagTail ${actions.scriptTagElement || "{}"}
	| "<SCRIPT" scriptTagTail ${actions.scriptTagElement || "{}"}
	;

scriptTagTail
	: attributeStartClose jsString "</script" optionalWhiteSpaceString ">" ${actions.scriptTagTailContent || "{}"}
	| attributeStartClose jsString "</SCRIPT" optionalWhiteSpaceString ">" ${actions.scriptTagTailContent || "{}"}
	| attributeStartSelfClose ${actions.scriptTagTailEnd || "{}"}
	;

cssStringToken
	: White_Space_Char
	| "<!DOCTYPE"
	| "<div"
	| "</div"
	| htmlVoidTagOpenings
	| "<!--"
	| "<!--[if lte IE 8]>"
	| "<![endif]-->"
	| "-->"
	| "<esi:comment"
	| "<esi:include"
	| "<esi:return"
	| "<esi:assign"
	| "<esi:choose"
	| "<esi:when"
	| "<esi:otherwise"
	| "</esi:otherwise"
	| "<esi:vars"
	| "<esi:try"
	| "<esi:attempt"
	| "<esi:except"
	| "<esi:eval"
	| "<esi:function"
	| "</esi:function"
	| "<esi:foreach"
	| "</esi:foreach"
	| "<esi:remove"
	| "</esi:remove"
	| "</esi:try"
	| "</esi:attempt"
	| "</esi:except"
	| "<esi:inline"
	| "</esi:inline"
	| "</esi:vars"
	| "</esi:choose"
	| "</esi:when"
	| "<script"
	| "<style"
	| "</script"
	| ASCII_Digit
	| ASCII_Initial_Char
	| HYPHON
	| "</"
	| "/>"
	| "<"
	| ">"
	| "/"
	| FULLY_ESCAPED
	| ESCAPE_PUNC
	| DOUBLE_QUOTE
	| SINGLE_QUOTE
	| ":"
	| "="
	| Unknown_Char
	| DOT
	;

 cssString
		: /**/ ${actions.cssStringEpsilon || "{}"}
		| cssString cssStringToken ${actions.cssString || "{}"}
		;

styleTagElement
		: "<style" styleTagTail ${actions.styleTagElement || "{}"}
		;

styleTagTail
		: attributeStartClose cssString "</style" optionalWhiteSpaceString ">" ${actions.styleTagTailContent || "{}"}
		| attributeStartSelfClose ${actions.styleTagTailEnd || "{}"}
		;

divElement
		: "<div" attributeStartClose maybeHtmlDom "</div" optionalWhiteSpaceString ">" ${actions.divElement || "{}"}
		${errors.divElement ? "| \"<div\" attributeStartClose maybeHtmlDom error optionalWhiteSpaceString \">\" " + errors.divElement + "\n\t" : "" };

escapedAttribute
		: initialFirstAlphaNumHyph "=" escapedString ${actions.escapedAttribute || "{}"}
		;

unEscapedAttribute
		: initialFirstAlphaNumHyph ${actions.unEscapedAttributeKeyOnly || "{}"}
		| initialFirstAlphaNumHyph "=" unicodeAlphanumeric ${actions.unEscapedAttributeKeyValue || "{}"}
		;

attributeTailSelfClose
		: attributeSeq unEscapedAttribute optionalWhiteSpaceString "/>" ${actions.attributeTailSelfCloseUnEscaped || "{}"}
		| attributeSeq escapedAttribute optionalWhiteSpaceString "/>" ${actions.attributeTailSelfCloseEscaped || "{}"}
		;

attributeTailClose
		: attributeSeq unEscapedAttribute optionalWhiteSpaceString ">" ${actions.attributeTailCloseUnEscaped || "{}"}
		| attributeSeq escapedAttribute optionalWhiteSpaceString ">" ${actions.attributeTailCloseEscaped || "{}"}
		;

attributeTailVoid
		: attributeSeq unEscapedAttribute optionalWhiteSpaceString "/>" ${actions.attributeTailVoidUnEscaped || "{}"}
		| attributeSeq escapedAttribute optionalWhiteSpaceString "/>" ${actions.attributeTailVoidEscaped || "{}"}
		| attributeSeq unEscapedAttribute optionalWhiteSpaceString ">" ${actions.attributeTailVoidUnEscaped || "{}"}
		| attributeSeq escapedAttribute optionalWhiteSpaceString ">" ${actions.attributeTailVoidEscaped || "{}"}
		;

attributeSeq
		: /**/ ${actions.attributeSeqEpsilon || "{}"}
		| attributeSeq escapedAttribute optionalWhiteSpaceString ${actions.attributeSeqEscaped || "{}"}
		| attributeSeq unEscapedAttribute whiteSpaceString ${actions.attributeSeqUnEscaped || "{}"}
		;

attributeStartSelfClose
		: optionalWhiteSpaceString "/>" ${actions.attributeStartSelfCloseNoAttributes || "{}"}
		| whiteSpaceString attributeTailSelfClose ${actions.attributeStartSelfCloseAttributes || "{}"}
		;

attributeStartClose
		: optionalWhiteSpaceString ">" ${actions.attributeStartCloseNoAttributes || "{}"}
		| whiteSpaceString attributeTailClose ${actions.attributeStartCloseAttributes || "{}"}
		;

attributeStartVoid
		: optionalWhiteSpaceString ">" ${actions.attributeStartVoidNoAttributes || "{}"}
		| optionalWhiteSpaceString "/>" ${actions.attributeStartVoidNoAttributes || "{}"}
		| whiteSpaceString attributeTailVoid ${actions.attributeStartVoidAttributes || "{}"}
		;
`
}

module.exports.fillActions = fillActions

function buildGenericActions(errors){
	var actions = {};
	for(var i in actionList){
		var actionObj = actionList[i];
		var ac = [];
		for(var j = 1; j < actionObj.arity + 1; j++){
			ac.push("$" + j);
		}
		var s = ac.join(" + ");
		if(actionObj.arity === 0){
			s = " \"\" "
		}
		actions[i] = "-> " + s;
	}
	actions["root"] = "{ console.log($1 + $2); $$ = $1 + $2; }"
	return fillActions(actions, errors);
}

module.exports.buildGenericActions = buildGenericActions
