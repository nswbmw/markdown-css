### markdown-css ###

As you might expect , markdown-css is a fine choice that add some CSS styles to markdown text , and finally , it will be converted to HTML .

### Installation ###

    npm install markdown-css

### Usage ###

It's unbelievably easy to use . For example :

    var MC = require('markdown-css');

    var result = MC("[google](http://google.com){{#f00 bold 3em}}");
    console.log(result);
    //=> <p><a href="http://google.com" style="color:#f00;font-weight:bold;font-size:3em;">google</a></p>


You just need to put some CSS styles between `{{` and `}}` .

### Examples ###

Here are some simple usage :

    **hello world**{{#f00 3em 900}}
    //=> <strong style="color:#f00;font-size:3em;font-weight:900;">hello world</strong>

    **{{#f00 3em}}**
    //=> <strong style="color:#f00;font-size:3em;"></strong>

    <p>hello{{#00f bold 1.5em}}world</p>
    //=> <p style="color:#00f;font-weight:bold;font-size:1.5em;">helloworld</p>

    <p>hello{{rgb(0,255,0) italic 150%}}world</p>
    //=> <p style="color:rgb(0,255,0);font-style:italic;font-size:150%;">helloworld</p>

    <p style="color:#00f;text-indent:2em;">hello world</p>
    //=> <p style="color:#00f;text-indent:2em;">hello world</p>

    <div><p>hello world</p>{{#f00}}</div>
    //=> <div><p style="color:#f00">hello world</p></div>

    <div>{{#f00}}<p>hello world</p></div>
    //=> <div style="color:#f00"><p>hello world</p></div>

    <div>hello {{#f00}}<p>world</p></div>
    //=> <div style="color:#f00;">hello <p>world</p></div>

    **hello world**{{margin[5px,10px] padding[5px,10px,8px]}}
    //=> <strong style="margin:5px 10px;padding:5px 10px 8px;">hello world</strong>

    > hello {{#f00 20px}}world
    //=> <blockquote>
         <p style="color:#f00;font-size:20px;">hello world</p>
         </blockquote>

### Customizable ###

The most exciting is that you can make your customized CSS Mapping, like `#000` means `color:#000` , `bold` means `font-weight:bold` . you can find them in `/lib/toCSS.js` .
    

### LICENSE ###

MIT
