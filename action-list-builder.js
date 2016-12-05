
var fs = require('fs');
var actionReg = /\$\{\s*actions\.([a-zA-Z0-9_\-]+)/
var arityFrontReg = /\s*(:|\|)/
var arityBackReg = /^([\.0-9a-zA-Z\-_\{\}\s\"\|])*\$/
var data = fs.readFileSync(__dirname + "/esi-gammar-builder.js", 'utf8');
var dataSplits = data.split("\n");


function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

function arityExtractor(line){

  var cLine = reverseString(reverseString(line.replace(arityFrontReg, "")).replace(arityBackReg, "")).replace("/**/","").trim();
  if(cLine === ""){
    return {productions: "/**/", arity:0, symbols:[]};
  }
  return {productions: cLine, arity:cLine.split(" ").length, /*symbols:cLine.split(" ")*/} ;
}

function actionExtractor(line){
  if(actionReg.test(line)){
    return actionReg.exec(line)[1];
  }
  return false;
}

var actions = {};

for(var i in dataSplits){
  var action = actionExtractor(dataSplits[i]);
  var arityObj = null;
  if(action){
    arityObj = arityExtractor(dataSplits[i]);
    arityObj.action = action;
    actions[action] = arityObj;
  }
}

var actionsStr = JSON.stringify(actions, null, 2);

fs.writeFileSync("./action-list.js", "module.exports = " + actionsStr);
