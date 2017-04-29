var beautifier = require("js-beautify").html;
var commentStripper = /\<\!\-\-(.*?)\-\-\>/i

function preprocess(str){
  var noComments = str;
  while(commentStripper.test(noComments)){
    noComments = noComments.replace(commentStripper, "");
  }

  return beautifier(noComments);
}

module.exports = preprocess;
