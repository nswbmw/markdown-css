var toCSS = require('./toCSS.js');

var emptyTags = {
  "area": 1,
  "base": 1,
  "basefont": 1,
  "br": 1,
  "col": 1,
  "frame": 1,
  "hr": 1,
  "img": 1,
  "input": 1,
  "isindex": 1,
  "link": 1,
  "meta": 1,
  "param": 1,
  "embed": 1,
  "?xml": 1
};

function toHTML(item) {
  if (Array.isArray(item)) {
    return item.map(function (subitem) {
      return toHTML(subitem);
    }).join('');
  }
  if (typeof item != 'undefined' && typeof item.type != 'undefined') {
    switch (item.type) {
      case 'style':
      case 'script':
      case 'tag':
        /* Filter, ignore <css> 、<head> 、<body> etc. */
        if (item.name == "css" || item.name == "head" || item.name == "body") {
          return ;
        }
        /* if this tag contain <css> tag internally, then add <css> value to current tag . */
        if (item.children) {
          item.children.map(function (subitem) {
            /* avoid:
            ** <div><p>hello world</p>{{#f00}}</div> 
            ** => <div style="color:#f00"><p style="color:#f00">hello world</p></div>
            **
            ** right:
            ** <div><p>hello world</p>{{#f00}}</div>
            ** => <div><p style="color:#f00">hello world</p></div>
            **
            ** <div>{{#f00}}<p>hello world</p></div>
            ** => <div style="color:#f00"><p>hello world</p></div>
            **
            ** so, check if subitem.prev == null (check if it following a tag)is very important.
            */
            if (subitem.name == "css" && (subitem.prev == null)) {
              var cssArr = subitem.children[0].data.split(" ");
              if (item.attribs.style) {
                item.attribs.style += ";" + toCSS(cssArr);
              } else {
                item.attribs.style = toCSS(cssArr);
              }
            }
          });
        }
        /* if next tag is <css>, add <css> value to current tag . */
        if (item.next && item.next.name == "css") {
          var cssStr = item.next.children[0].data;
          var cssArr = cssStr.split(" ");
          item.attribs.style = toCSS(cssArr);
        }
        /* compile DOM Object to HTML string. */
        var result = '<' + item.name;
        if (item.attribs && Object.keys(item.attribs).length > 0) {
          result += ' ' + Object.keys(item.attribs).map(function (key) {
            return key + '="' + item.attribs[key] + '"';
          }).join(' ');
        }
        /* Traverse sub-elements */
        if (item.children) {
          result += '>' + toHTML(item.children) + (emptyTags[item.name] ? '' : '</' + item.name + '>');
        } else {
          result += (emptyTags[item.name] ? '>' : '></' + item.name + '>');
        }
        return result;
      case 'text':
        return item.data;
      case 'directive':
        return '<' + item.data + '>';
      case 'comment':
        return '<!--' + item.data + '-->';
      case 'cdata':
        return '<!CDATA[' + item.data + ']]>';
    }
  }
}

module.exports = toHTML;