var marked = require('marked');
var htmlparser = require("htmlparser2");
var toHTML = require("./lib/toHTML.js");
function MC(mcStr) {
  var result = "";
  var mdStr = marked(mcStr.replace(/{{/g, "<css>").replace(/}}/g, "</css>"));
  var handler = new htmlparser.DomHandler(function (error, dom) {
    if (error) {
      return result;
    } else {
      result = toHTML(dom);
    }
  });
  var parser = new htmlparser.Parser(handler);
  parser.write(mdStr);
  parser.done();
  return result;
}

module.exports = MC;