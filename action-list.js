module.exports = {
  "root": {
    "productions": "docTypeTag maybeHtmlDom EOF",
    "arity": 3,
    "action": "root"
  },
  "escapedDQuote": {
    "productions": "ESCAPE_PUNC DOUBLE_QUOTE",
    "arity": 2,
    "action": "escapedDQuote"
  },
  "nonTagedStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "nonTagedStringEpsilon"
  },
  "nonTagedString": {
    "productions": "nonTagedString FULLY_ESCAPED",
    "arity": 2,
    "action": "nonTagedString"
  },
  "escapedChar": {
    "productions": "ESCAPE_PUNC HYPHON",
    "arity": 2,
    "action": "escapedChar"
  },
  "escapedSQuote": {
    "productions": "ESCAPE_PUNC SINGLE_QUOTE",
    "arity": 2,
    "action": "escapedSQuote"
  },
  "anyNonDoubleQEscapeBreakingStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "anyNonDoubleQEscapeBreakingStringEpsilon"
  },
  "anyNonDoubleQEscapeBreakingString": {
    "productions": "anyNonDoubleQEscapeBreakingString HYPHON",
    "arity": 2,
    "action": "anyNonDoubleQEscapeBreakingString"
  },
  "anyNonSingleQEscapeBreakingStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "anyNonSingleQEscapeBreakingStringEpsilon"
  },
  "anyNonSingleQEscapeBreakingString": {
    "productions": "anyNonSingleQEscapeBreakingString HYPHON",
    "arity": 2,
    "action": "anyNonSingleQEscapeBreakingString"
  },
  "escapedString": {
    "productions": "SINGLE_QUOTE anyNonSingleQEscapeBreakingString SINGLE_QUOTE",
    "arity": 3,
    "action": "escapedString"
  },
  "optionalWhiteSpaceStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "optionalWhiteSpaceStringEpsilon"
  },
  "optionalWhiteSpaceString": {
    "productions": "whiteSpaceString",
    "arity": 1,
    "action": "optionalWhiteSpaceString"
  },
  "optionalSlashEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "optionalSlashEpsilon"
  },
  "optionalSlash": {
    "productions": "\"/\"",
    "arity": 1,
    "action": "optionalSlash"
  },
  "whiteSpaceStringChar": {
    "productions": "White_Space_Char",
    "arity": 1,
    "action": "whiteSpaceStringChar"
  },
  "whiteSpaceStringCharSeq": {
    "productions": "whiteSpaceString White_Space_Char",
    "arity": 2,
    "action": "whiteSpaceStringCharSeq"
  },
  "unicodeAlphanumericDigit": {
    "productions": "ASCII_Digit",
    "arity": 1,
    "action": "unicodeAlphanumericDigit"
  },
  "unicodeAlphanumericDigitSeq": {
    "productions": "unicodeAlphanumeric ASCII_Digit",
    "arity": 2,
    "action": "unicodeAlphanumericDigitSeq"
  },
  "unicodeAlphanumericInitial": {
    "productions": "ASCII_Initial_Char",
    "arity": 1,
    "action": "unicodeAlphanumericInitial"
  },
  "unicodeAlphanumericInitialSeq": {
    "productions": "unicodeAlphanumeric ASCII_Initial_Char",
    "arity": 2,
    "action": "unicodeAlphanumericInitialSeq"
  },
  "unicodeAlphaNumHyphDigit": {
    "productions": "ASCII_Digit",
    "arity": 1,
    "action": "unicodeAlphaNumHyphDigit"
  },
  "unicodeAlphaNumHyphInitial": {
    "productions": "ASCII_Initial_Char",
    "arity": 1,
    "action": "unicodeAlphaNumHyphInitial"
  },
  "unicodeAlphaNumHyphDigitSeq": {
    "productions": "unicodeAlphaNumHyph ASCII_Digit",
    "arity": 2,
    "action": "unicodeAlphaNumHyphDigitSeq"
  },
  "unicodeAlphaNumHyphInitialSeq": {
    "productions": "unicodeAlphaNumHyph ASCII_Initial_Char",
    "arity": 2,
    "action": "unicodeAlphaNumHyphInitialSeq"
  },
  "unicodeAlphaNumHyphHyphenDigitSeq": {
    "productions": "unicodeAlphaNumHyph HYPHON ASCII_Digit",
    "arity": 3,
    "action": "unicodeAlphaNumHyphHyphenDigitSeq"
  },
  "unicodeAlphaNumHyphHyphenInitialSeq": {
    "productions": "unicodeAlphaNumHyph HYPHON ASCII_Initial_Char",
    "arity": 3,
    "action": "unicodeAlphaNumHyphHyphenInitialSeq"
  },
  "initialFirstUnicodeAlphanumericInitial": {
    "productions": "ASCII_Initial_Char",
    "arity": 1,
    "action": "initialFirstUnicodeAlphanumericInitial"
  },
  "initialFirstUnicodeAlphanumericSeq": {
    "productions": "ASCII_Initial_Char unicodeAlphanumeric",
    "arity": 2,
    "action": "initialFirstUnicodeAlphanumericSeq"
  },
  "initialFirstAlphaNumHyphInitial": {
    "productions": "ASCII_Initial_Char",
    "arity": 1,
    "action": "initialFirstAlphaNumHyphInitial"
  },
  "initialFirstAlphaNumHyphSeq": {
    "productions": "ASCII_Initial_Char unicodeAlphaNumHyph",
    "arity": 2,
    "action": "initialFirstAlphaNumHyphSeq"
  },
  "initialFirstAlphaNumHyphHyphonSeq": {
    "productions": "ASCII_Initial_Char HYPHON unicodeAlphaNumHyph",
    "arity": 3,
    "action": "initialFirstAlphaNumHyphHyphonSeq"
  },
  "docTypeTagEspilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "docTypeTagEspilon"
  },
  "docTypeTag": {
    "productions": "\"<!DOCTYPE\" nonTagedString \">\"",
    "arity": 3,
    "action": "docTypeTag"
  },
  "esiOpenTagHead": {
    "productions": "openEsiTagName attributeStartClose",
    "arity": 2,
    "action": "esiOpenTagHead"
  },
  "esiCloseTag": {
    "productions": "closeEsiTagName optionalWhiteSpaceString \">\"",
    "arity": 3,
    "action": "esiCloseTag"
  },
  "esiSelfClosingTagHead": {
    "productions": "selfClosingEsiTagName attributeStartSelfClose",
    "arity": 2,
    "action": "esiSelfClosingTagHead"
  },
  "esiDomElementSelfClosing": {
    "productions": "esiSelfClosingTagHead",
    "arity": 1,
    "action": "esiDomElementSelfClosing"
  },
  "esiDomElementOpenClose": {
    "productions": "esiOpenTagHead maybeHtmlDom esiCloseTag",
    "arity": 3,
    "action": "esiDomElementOpenClose"
  },
  "htmlOpenTagHead": {
    "productions": "\"<\" initialFirstUnicodeAlphanumeric attributeStartClose",
    "arity": 3,
    "action": "htmlOpenTagHead"
  },
  "htmlCloseTag": {
    "productions": "\"</\" initialFirstUnicodeAlphanumeric optionalWhiteSpaceString \">\"",
    "arity": 4,
    "action": "htmlCloseTag"
  },
  "htmlSelfClosingTagHead": {
    "productions": "\"<\" initialFirstUnicodeAlphanumeric attributeStartSelfClose",
    "arity": 3,
    "action": "htmlSelfClosingTagHead"
  },
  "htmlVoidTagHead": {
    "productions": "htmlVoidTagOpenings attributeStartVoid",
    "arity": 2,
    "action": "htmlVoidTagHead"
  },
  "htmlComment": {
    "productions": "\"<!--\" maybeHtmlDom \"-->\"",
    "arity": 3,
    "action": "htmlComment"
  },
  "maybeHtmlDomNonTagedString": {
    "productions": "nonTagedString",
    "arity": 1,
    "action": "maybeHtmlDomNonTagedString"
  },
  "maybeHtmlDomDivDomElement": {
    "productions": "maybeHtmlDom divElement nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomDivDomElement"
  },
  "maybeHtmlDomEsiDomElement": {
    "productions": "maybeHtmlDom esiDomElement nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomEsiDomElement"
  },
  "maybeHtmlDomHtmlDomElement": {
    "productions": "maybeHtmlDom htmlDomElement nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomHtmlDomElement"
  },
  "maybeHtmlDomHtmlCommentDomElement": {
    "productions": "maybeHtmlDom htmlComment nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomHtmlCommentDomElement"
  },
  "maybeHtmlDomScriptTagDomElement": {
    "productions": "maybeHtmlDom scriptTagElement nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomScriptTagDomElement"
  },
  "maybeHtmlDomStyleDomElement": {
    "productions": "maybeHtmlDom styleTagElement nonTagedString",
    "arity": 3,
    "action": "maybeHtmlDomStyleDomElement"
  },
  "htmlDomElementSelfClose": {
    "productions": "htmlVoidTagHead",
    "arity": 1,
    "action": "htmlDomElementSelfClose"
  },
  "htmlDomElementOpenClose": {
    "productions": "htmlOpenTagHead maybeHtmlDom htmlCloseTag",
    "arity": 3,
    "action": "htmlDomElementOpenClose"
  },
  "jsStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "jsStringEpsilon"
  },
  "jsString": {
    "productions": "jsString jsStringToken",
    "arity": 2,
    "action": "jsString"
  },
  "scriptTagElement": {
    "productions": "\"<script\" scriptTagTail",
    "arity": 2,
    "action": "scriptTagElement"
  },
  "scriptTagTailContent": {
    "productions": "attributeStartClose jsString \"</script\" optionalWhiteSpaceString \">\"",
    "arity": 5,
    "action": "scriptTagTailContent"
  },
  "scriptTagTailEnd": {
    "productions": "attributeStartSelfClose",
    "arity": 1,
    "action": "scriptTagTailEnd"
  },
  "cssStringEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "cssStringEpsilon"
  },
  "cssString": {
    "productions": "cssString cssStringToken",
    "arity": 2,
    "action": "cssString"
  },
  "styleTagElement": {
    "productions": "\"<style\" styleTagTail",
    "arity": 2,
    "action": "styleTagElement"
  },
  "styleTagTailContent": {
    "productions": "attributeStartClose cssString \"</style\" optionalWhiteSpaceString \">\"",
    "arity": 5,
    "action": "styleTagTailContent"
  },
  "styleTagTailEnd": {
    "productions": "attributeStartSelfClose",
    "arity": 1,
    "action": "styleTagTailEnd"
  },
  "divElement": {
    "productions": "\"<div\" attributeStartClose maybeHtmlDom \"</div\" optionalWhiteSpaceString \">\"",
    "arity": 6,
    "action": "divElement"
  },
  "escapedAttribute": {
    "productions": "initialFirstAlphaNumHyph \"=\" escapedString",
    "arity": 3,
    "action": "escapedAttribute"
  },
  "unEscapedAttributeKeyOnly": {
    "productions": "initialFirstAlphaNumHyph",
    "arity": 1,
    "action": "unEscapedAttributeKeyOnly"
  },
  "unEscapedAttributeKeyValue": {
    "productions": "initialFirstAlphaNumHyph \"=\" unicodeAlphanumeric",
    "arity": 3,
    "action": "unEscapedAttributeKeyValue"
  },
  "attributeTailSelfCloseUnEscaped": {
    "productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \"/>\"",
    "arity": 4,
    "action": "attributeTailSelfCloseUnEscaped"
  },
  "attributeTailSelfCloseEscaped": {
    "productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \"/>\"",
    "arity": 4,
    "action": "attributeTailSelfCloseEscaped"
  },
  "attributeTailCloseUnEscaped": {
    "productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \">\"",
    "arity": 4,
    "action": "attributeTailCloseUnEscaped"
  },
  "attributeTailCloseEscaped": {
    "productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \">\"",
    "arity": 4,
    "action": "attributeTailCloseEscaped"
  },
  "attributeTailVoidUnEscaped": {
    "productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \">\"",
    "arity": 4,
    "action": "attributeTailVoidUnEscaped"
  },
  "attributeTailVoidEscaped": {
    "productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \">\"",
    "arity": 4,
    "action": "attributeTailVoidEscaped"
  },
  "attributeSeqEpsilon": {
    "productions": "/**/",
    "arity": 0,
    "symbols": [],
    "action": "attributeSeqEpsilon"
  },
  "attributeSeqEscaped": {
    "productions": "attributeSeq escapedAttribute optionalWhiteSpaceString",
    "arity": 3,
    "action": "attributeSeqEscaped"
  },
  "attributeSeqUnEscaped": {
    "productions": "attributeSeq unEscapedAttribute whiteSpaceString",
    "arity": 3,
    "action": "attributeSeqUnEscaped"
  },
  "attributeStartSelfCloseNoAttributes": {
    "productions": "optionalWhiteSpaceString \"/>\"",
    "arity": 2,
    "action": "attributeStartSelfCloseNoAttributes"
  },
  "attributeStartSelfCloseAttributes": {
    "productions": "whiteSpaceString attributeTailSelfClose",
    "arity": 2,
    "action": "attributeStartSelfCloseAttributes"
  },
  "attributeStartCloseNoAttributes": {
    "productions": "optionalWhiteSpaceString \">\"",
    "arity": 2,
    "action": "attributeStartCloseNoAttributes"
  },
  "attributeStartCloseAttributes": {
    "productions": "whiteSpaceString attributeTailClose",
    "arity": 2,
    "action": "attributeStartCloseAttributes"
  },
  "attributeStartVoidNoAttributes": {
    "productions": "optionalWhiteSpaceString \"/>\"",
    "arity": 2,
    "action": "attributeStartVoidNoAttributes"
  },
  "attributeStartVoidAttributes": {
    "productions": "whiteSpaceString attributeTailVoid",
    "arity": 2,
    "action": "attributeStartVoidAttributes"
  }
}