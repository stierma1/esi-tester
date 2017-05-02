var $$ = "dummy";
var actionList = require("../action-list")
var builder = require("../esi-gammar-builder")

function createGenerics() {var actions = {};
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
return actions;
}

var actionFuncs = {
	/*{
		"productions": "docTypeTag maybeHtmlDom EOF",
		"arity": 3,
		"action": "root"
	}*/
	root: function(){

		$$ = {
			type:"ROOT",
			docType: $1,
			inner: $2,
		 // raw: // $1.raw + $2.raw
		}
		if(!process._silentParsers)
			console.log(JSON.stringify($$, null,2));
		return $$
	},
	/*{
		"productions": "\/**\/",
		"arity": 0,
		"symbols": [],
		"action": "docTypeTagEspilon"
	}*/
	docTypeTagEspilon: function(){
		$$ = {
			type:"DOCTYPE",
			content:null,
			exists: false,
		 // raw: ""
		}
	},
	/*{
		"productions": "\"<!DOCTYPE\" nonTagedString \">\"",
		"arity": 3,
		"action": "docTypeTag"
	},*/
	docTypeTag: function(){
		$$ = {
			type:"DOCTYPE",
			exists: true,
			content: $2,
		 // raw: $1 + $2  + $3
		}
	},
	/*
	"attributeStartSelfCloseNoAttributes": {
		"productions": "optionalWhiteSpaceString \"/>\"",
		"arity": 2,
		"action": "attributeStartSelfCloseNoAttributes"
	}*/
	attributeStartSelfCloseNoAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: [],
		 // raw: $1 + $2
		}
	},
	/*
	"attributeStartSelfCloseAttributes": {
		"productions": "whiteSpaceString attributeTailSelfClose",
		"arity": 2,
		"action": "attributeStartSelfCloseAttributes"
	},*/
	attributeStartSelfCloseAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: $2.attributes,
		 // raw: $1 + $2.raw
		}
	},
	/*
	"attributeStartCloseNoAttributes": {
		"productions": "optionalWhiteSpaceString \">\"",
		"arity": 2,
		"action": "attributeStartCloseNoAttributes"
	},*/
	attributeStartCloseNoAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: [],
		 // raw: $1 + $2
		}
	},
	/*
	"attributeStartCloseAttributes": {
		"productions": "whiteSpaceString attributeTailClose",
		"arity": 2,
		"action": "attributeStartCloseAttributes"
	},*/
	attributeStartCloseAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: $2.attributes,
		 // raw: $1 + $2.raw
		}
	},
	/*
	"attributeStartVoidNoAttributes": {
		"productions": "optionalWhiteSpaceString \"/>\"",
		"arity": 2,
		"action": "attributeStartVoidNoAttributes"
	},*/
	attributeStartVoidNoAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: [],
		 // raw: $1 + $2
		}
	},
	/*"attributeStartVoidAttributes": {
		"productions": "whiteSpaceString attributeTailVoid",
		"arity": 2,
		"action": "attributeStartVoidAttributes"
	}*/
	attributeStartVoidAttributes: function(){
		$$ = {
			type: "ATTRIBUTES",
			attributes: $2.attributes,
		 // raw: $1 + $2.raw
		}
	},
	/*
	"escapedAttribute": {
		"productions": "initialFirstAlphaNumHyph \"=\" escapedString",
		"arity": 3,
		"action": "escapedAttribute"
	},*/
	escapedAttribute: function(){
		var val = $3.substr(0, $3.length - 1);
		val = val.substr(1, val.length - 1);

		$$ = {
			type: "ATTRIBUTE",
			keyValue: true,
			key: $1,
			value: val,
		 // raw: $1 + $2 + $3
		}
	},
	/*"unEscapedAttributeKeyOnly": {
		"productions": "initialFirstAlphaNumHyph",
		"arity": 1,
		"action": "unEscapedAttributeKeyOnly"
	},*/
	unEscapedAttributeKeyOnly: function(){
		$$ = {
			type: "ATTRIBUTE",
			keyValue: false,
			key: $1,
		 // raw: $1
		}
	},
	/*"unEscapedAttributeKeyValue": {
		"productions": "initialFirstAlphaNumHyph \"=\" unicodeAlphanumeric",
		"arity": 3,
		"action": "unEscapedAttributeKeyValue"
	},*/
	unEscapedAttributeKeyValue: function(){
		var value = $3;
		var resValue = undefined;
		if(value === "true"){
			resValue = true;
		} else if(value === "false"){
			resValue = false;
		} else if(value === "null"){
			resValue = null;
		} else if(!isNaN(Number(value))){
			resValue = Number(value);
		} else {
			resValue = value;
		}

		$$ = {
			type: "ATTRIBUTE",
			keyValue: true,
			key: $1,
			value: resValue,
		 // raw: $1 + $2 + $3
		}
	},
	/*
	"attributeTailSelfCloseUnEscaped": {
		"productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \"/>\"",
		"arity": 4,
		"action": "attributeTailSelfCloseUnEscaped"
	},*/
	attributeTailSelfCloseUnEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*
	"attributeTailSelfCloseEscaped": {
		"productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \"/>\"",
		"arity": 4,
		"action": "attributeTailSelfCloseEscaped"
	},*/
	attributeTailSelfCloseEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*"attributeTailCloseUnEscaped": {
		"productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \">\"",
		"arity": 4,
		"action": "attributeTailCloseUnEscaped"
	},*/
	attributeTailCloseUnEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*"attributeTailCloseEscaped": {
		"productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \">\"",
		"arity": 4,
		"action": "attributeTailCloseEscaped"
	},*/
	attributeTailCloseEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*"attributeTailVoidUnEscaped": {
		"productions": "attributeSeq unEscapedAttribute optionalWhiteSpaceString \">\"",
		"arity": 4,
		"action": "attributeTailVoidUnEscaped"
	},*/
	attributeTailVoidUnEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*"attributeTailVoidEscaped": {
		"productions": "attributeSeq escapedAttribute optionalWhiteSpaceString \">\"",
		"arity": 4,
		"action": "attributeTailVoidEscaped"
	},*/
	attributeTailVoidEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3 + $4
		$$ = $1;
	},
	/*"attributeSeqEpsilon": {
		"productions": "\/**\/",
		"arity": 0,
		"symbols": [],
		"action": "attributeSeqEpsilon"
	},*/
	attributeSeqEpsilon: function(){
		$$ = {
			type:"ATTRIBUTES",
			attributes: [],
		 // raw: ""
		}
	},
	/*"attributeSeqEscaped": {
		"productions": "attributeSeq escapedAttribute optionalWhiteSpaceString",
		"arity": 3,
		"action": "attributeSeqEscaped"
	},*/
	attributeSeqEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3;
		$$ = $1;
	},
	/*"attributeSeqUnEscaped": {
		"productions": "attributeSeq unEscapedAttribute whiteSpaceString",
		"arity": 3,
		"action": "attributeSeqUnEscaped"
	},*/
	attributeSeqUnEscaped: function(){
		$1.attributes.push($2);
		// $1.raw += $2.raw + $3;
		$$ = $1;
	},
	/*"esiOpenTagHead": {
		"productions": "openEsiTagName attributeStartClose",
		"arity": 2,
		"action": "esiOpenTagHead"
	},*/
	esiOpenTagHead: function(){
		var esiType = $1.split(":")[1];

		$$ = {
			type:"ESI_TAG",
			esiType:esiType,
			attributes: $2.attributes,
		 // raw: $1 + $2.raw
		}
	},
	/*"esiSelfClosingTagHead": {
		"productions": "selfClosingEsiTagName attributeStartSelfClose",
		"arity": 2,
		"action": "esiSelfClosingTagHead"
	},*/
	esiSelfClosingTagHead: function(){
		var esiType = $1.split(":")[1];

		$$ = {
			type:"ESI_TAG",
			esiType:esiType,
			attributes: $2.attributes,
		 // raw: $1 + $2.raw
		}
	},
	/*"esiDomElementSelfClosing": {
		"productions": "esiSelfClosingTagHead",
		"arity": 1,
		"action": "esiDomElementSelfClosing"
	},*/
	 esiDomElementSelfClosing: function(){

		 $$ = {
			 type:"ESI_ELEMENT",
			 esiType:$1.esiType,
			 headTag: $1,
			// raw: // $1.raw,
			 inner:[]
		 }
	 },
	/*"esiDomElementOpenClose": {
		"productions": "esiOpenTagHead maybeHtmlDom esiCloseTag",
		"arity": 3,
		"action": "esiDomElementOpenClose"
	},*/
	 esiDomElementOpenClose: function(){
		 $$ = {
			 type:"ESI_ELEMENT",
			 esiType:$1.esiType,
			 headTag: $1,
			// raw: // $1.raw + $2.raw + $3.raw,
			 inner:$2
		 }
	 },
	 /*"htmlOpenTagHead": {
		 "productions": "\"<\" initialFirstUnicodeAlphanumeric attributeStartClose",
		 "arity": 3,
		 "action": "htmlOpenTagHead"
	 },*/
	 htmlOpenTagHead: function(){
		 $$ = {
			 type:"HTML_TAG",
			 htmlTag: $2,
			 attributes: $3.attributes,
			// raw: $1 + $2 + $3.raw
		 }
	 },
	 /*"htmlSelfClosingTagHead": {
		 "productions": "\"<\" initialFirstUnicodeAlphanumeric attributeStartSelfClose",
		 "arity": 3,
		 "action": "htmlSelfClosingTagHead"
	 },*/
	 htmlSelfClosingTagHead: function(){
		 $$ = {
			 type:"HTML_TAG",
			 htmlTag: $2,
			 attributes: $3.attributes,
			// raw: $1 + $2 + $3.raw
		 }
	 },
	 /*"htmlVoidTagHead": {
		 "productions": "htmlVoidTagOpenings attributeStartVoid",
		 "arity": 2,
		 "action": "htmlVoidTagHead"
	 },*/
	 htmlVoidTagHead: function(){
		 $$ = {
			 type:"HTML_TAG",
			 htmlTag: $1.replace("<", ""),
			 attributes: $2.attributes,
			// raw: $1 + $2.raw
		 }
	 },
	 /*
	 "htmlComment": {
		 "productions": "\"<!--\" maybeHtmlDom \"-->\"",
		 "arity": 3,
		 "action": "htmlComment"
	 },*/
	 htmlComment: function(){
		 $$ = {
			 type:"HTML_COMMENT",
			 inner: $2,
			// raw: $1 + $2.raw + $3
		 }
	 },
	 /*
	 "maybeHtmlDomNonTagedString": {
		 "productions": "nonTagedString",
		 "arity": 1,
		 "action": "maybeHtmlDomNonTagedString"
	 },*/
	 maybeHtmlDomNonTagedString: function(){
		 var isEmpty = $1 === ""

		 $$ = {
			 type:"HTML_ELEMENTS",
			 elements: isEmpty ? [] : [$1],
			// raw: $1
		 }
	 },
	 /*"maybeHtmlDomDivDomElement": {
		 "productions": "maybeHtmlDom divElement nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomDivDomElement"
	 },*/
	 maybeHtmlDomDivDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"maybeHtmlDomEsiDomElement": {
		 "productions": "maybeHtmlDom esiDomElement nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomEsiDomElement"
	 },*/
	 maybeHtmlDomEsiDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"maybeHtmlDomHtmlDomElement": {
		 "productions": "maybeHtmlDom htmlDomElement nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomHtmlDomElement"
	 },*/
	 maybeHtmlDomHtmlDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"maybeHtmlDomHtmlCommentDomElement": {
		 "productions": "maybeHtmlDom htmlComment nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomHtmlCommentDomElement"
	 },*/
	 maybeHtmlDomHtmlCommentDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"maybeHtmlDomScriptTagDomElement": {
		 "productions": "maybeHtmlDom scriptTagElement nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomScriptTagDomElement"
	 },*/
	 maybeHtmlDomScriptTagDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"maybeHtmlDomStyleDomElement": {
		 "productions": "maybeHtmlDom styleTagElement nonTagedString",
		 "arity": 3,
		 "action": "maybeHtmlDomStyleDomElement"
	 },*/
	 maybeHtmlDomStyleDomElement: function(){
		 var isEmpty = $3 === "";
		 if(!isEmpty){
			 $1.elements.push($3)
		 }
		 $1.elements.push($2);
		 // $1.raw += $2.raw + $3;
		 $$ = $1;
	 },
	 /*"htmlDomElementSelfClose": {
		 "productions": "htmlVoidTagHead",
		 "arity": 1,
		 "action": "htmlDomElementSelfClose"
	 },*/
	 htmlDomElementSelfClose: function(){
			$$ = {
				type:"HTML_ELEMENT",
				htmlTag:$1.htmlTag,
				headTag: $1,
			 // raw: // $1.raw,
				inner:[]
			}
		},
	 /*"htmlDomElementOpenClose": {
		 "productions": "htmlOpenTagHead maybeHtmlDom htmlCloseTag",
		 "arity": 3,
		 "action": "htmlDomElementOpenClose"
	 },*/
	 htmlDomElementOpenClose: function(){
			$$ = {
				type:"HTML_ELEMENT",
				htmlTag:$1.htmlTag,
				headTag:$1,
			 // raw: // $1.raw + $2.raw + $3,
				inner:$2
			}
	 },
	 /*
	 "scriptTagElement": {
		 "productions": "\"<script\" scriptTagTail",
		 "arity": 2,
		 "action": "scriptTagElement"
	 },*/
	 scriptTagElement: function(){
		 $$ = {
			 type: "HTML_ELEMENT",
			 htmlTag:"script",
			 headTag: {
				 type:"HTML_TAG",
				 htmlTag: "script",
				 attributes:$2.attributes,
				// raw: $1 + $2.headRaw,
			 },
			 inner:$2.inner,
			// raw: $1 + $2.raw
		 }
	 },
	 /*"scriptTagTailContent": {
		 "productions": "attributeStartClose jsString \"</script\" optionalWhiteSpaceString \">\"",
		 "arity": 5,
		 "action": "scriptTagTailContent"
	 },*/
	 scriptTagTailContent: function(){
		 $$ = {
			 attributes: $1.attributes,
			// headRaw: // $1.raw,
			 inner: $2,
			// raw: $1 + $2 + $3 + $4 + $5
		 }
	 },
	 /*"scriptTagTailEnd": {
		 "productions": "attributeStartSelfClose",
		 "arity": 1,
		 "action": "scriptTagTailEnd"
	 },*/
	 scriptTagTailEnd: function(){
		 $$ = {
			 attributes: $1.attributes,
			// headRaw: // $1.raw,
			 inner: "",
			// raw: $1
		 }
	 },
	 /*"styleTagElement": {
		 "productions": "\"<style\" styleTagTail",
		 "arity": 2,
		 "action": "styleTagElement"
	 },*/
	 styleTagElement: function(){
		 $$ = {
			 type: "HTML_ELEMENT",
			 htmlTag:"style",
			 headTag: {
				 type:"HTML_TAG",
				 htmlTag: "style",
				 attributes:$2.attributes,
				// raw: $1 + $2.headRaw,
			 },
			 inner:$2.inner,
			// raw: $1 + $2.raw
		 }
	 },
	 /*"styleTagTailContent": {
		 "productions": "attributeStartClose cssString \"</style\" optionalWhiteSpaceString \">\"",
		 "arity": 5,
		 "action": "styleTagTailContent"
	 },*/
	 styleTagTailContent: function(){
		 $$ = {
			 attributes: $1.attributes,
			// headRaw: // $1.raw,
			 inner: $2,
			// raw: $1 + $2 + $3 + $4 + $5
		 }
	 },
	 /*"styleTagTailEnd": {
		 "productions": "attributeStartSelfClose",
		 "arity": 1,
		 "action": "styleTagTailEnd"
	 },*/
	 styleTagTailEnd: function(){
		 $$ = {
			 attributes: $1.attributes,
			// headRaw: // $1.raw,
			 inner: "",
			// raw: $1
		 }
	 },
	 /*"divElement": {
		 "productions": "\"<div\" attributeStartClose maybeHtmlDom \"</div\" optionalWhiteSpaceString \">\"",
		 "arity": 6,
		 "action": "divElement"
	 },*/
	 divElement: function(){
		 $$ = {
			 type: "HTML_ELEMENT",
			 htmlTag:"div",
			 headTag: {
				 type:"HTML_TAG",
				 htmlTag: "div",
				 attributes:$2.attributes,
				// raw: $1 + $2.raw
			 },
			 inner:$3,
			// raw: $1 + $2.raw + $3.raw + $4 + $5 + $6
		 }
	 }
}


module.exports = function(){
	var generics = createGenerics();
	for(var i in actionFuncs){
		var f = actionFuncs[i].toString().replace("function ()", "");
		generics[i] = f;
	}
	return {
		name: "html-ast",
		grammar: builder.fillActions(generics)
	}
}

module.exports.tolerant = function(){
	var generics = createGenerics();
	for(var i in actionFuncs){
		var f = actionFuncs[i].toString().replace("function ()", "");
		generics[i] = f;
	}
	var errors = {
		divElement: `{
		$$ = {
			type: "HTML_ELEMENT",
			htmlTag:"div",
			headTag: {
				type:"HTML_TAG",
				htmlTag: "div",
				attributes:$2.attributes,
			 // raw: $1 + $2.raw
			},
			inner:$3,
		 // raw: $1 + $2.raw + $3.raw + $4 + $5 + $6
		}
	}`
	}
	return {
		name: "tolerant-html-ast",
		grammar: builder.fillActions(generics, errors)
	}
}
