var marked = require('marked');
var htmlparser = require("htmlparser2");
var toHTML = require("./lib/toHTML.js");
function MC(mcStr, callback) {
  var mdStr = marked(mcStr.replace(/{{/g, "<css>").replace(/}}/g, "</css>"));
  var handler = new htmlparser.DomHandler(function (error, dom) {
      if (error) {
        throw error;
      } else {
        callback(toHTML(dom));
      }
  });
  var parser = new htmlparser.Parser(handler);
  parser.write(mdStr);
  parser.done();
}

module.exports = MC;