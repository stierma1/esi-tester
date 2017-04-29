var chai = require("chai");
var validate = require("../parsers/process-tolerant-validator").parse;
var fs = require("fs");

describe("#tolerant-validator parser", function(){
  it("should validate the google homepage", function(){
    validate(fs.readFileSync(__dirname + "/mock-data/google.html", "utf8"));
  })

  it("should validate the bby homepage", function(){
    this.timeout(10000)
    validate(fs.readFileSync(__dirname + "/mock-data/bby-ghp.html", "utf8"));
  })

  it("should validate the bby list-page", function(){
    this.timeout(10000)
    validate(fs.readFileSync(__dirname + "/mock-data/bby-list-page.html", "utf8"));
  })

  it("#should throw exception on invalid html[0]", function(){
    try{
      validate("<span></p></span>");
      throw "Should not reach here validator failed"
    } catch(err){
      if(err === "Should not reach here validator failed"){
        throw err;
      }

      if(!err.message.includes("Parse error")){
        throw err;
      }
    }
  });
  it("#should throw exception on invalid html[1]", function(){
    try{
      validate("<div></div></div>");
      throw "Should not reach here validator failed"
    } catch(err){
      if(err === "Should not reach here validator failed"){
        throw err;
      }

      if(!err.message.includes("Parse error")){
        throw err;
      }
    }
  });

  it("#should be div closing tolerant", function(){
      validate("<li> <div>yes </span></li>");
  });

});
