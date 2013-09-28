function toCSS(cssArr) {
  var result = "";
  for (var i = 0; i < cssArr.length; i++) {
    result += CSS(cssArr[i]) + ";";
  };
  return result;
}

function CSS(css) {
  switch (0) {

    /* CSS 背景属性（Background） */

    /* background :
    **   background-color
    **   background-position
    **   background-size
    **   background-repeat
    **   background-origin
    **   background-clip
    **   background-attachment
    **   background-image
    ** eg: bg[url(bgimage.gif),no-repeat,fixed,top]
    */
    case css.search(/bg/i) :
         return "background:" + css.slice(3, css.length - 1).split(",").join(" ");


    /* CSS 字体属性（Font） */

    /* font-size
    ** eg: 16px/1.5em/200%
    */
    case css.search(/\d+px/i) && css.search(/\d*\.?\d+em/i) && css.search(/\d+%/i) :
         return "font-size:" + css;

    /* font-weight
    ** eg: bold/bolder/lighter/100-900
    */
    case css.search(/bold/i) && css.search(/bolder/i) && css.search(/lighter/i) && css.search(/[1-9]00/i) :
         return "font-weight:" + css;

    /* font-style
    ** eg: italic/oblique
    */
    case css.search(/italic/i) && css.search(/oblique/i) :
          return "font-style:" + css;

    /* font-variant 
    ** eg: small-caps
    */
    case css.search(/small-caps/i) :
         return "font-variant:" + css;

    /* font-stretch
    ** eg: wider/narrower
    */ 
    case css.search(/wider/i) && css.search(/narrower/i) :
         return "font-stretch:" + css;


    /* CSS 列表属性（List）*/

    /* list-style :
    **   list-style-type
    **   list-style-position
    **   list-style-image
    ** eg: list[square,inside,url('/i/arrow.gif')]
    */
    case css.search(/list/i) :
         return "list-style:" + css.slice(5, css.length - 1).split(",").join(" ");


    /* CSS 外边距属性（Margin） */

    /* margin
    ** eg: margin[5,10]/margin[5,10,5]/margin[5,10,5,10]
    */
    case css.search(/margin/i) :
         return "margin:" + css.slice(7, css.length - 1).split(",").join(" ");


    /* CSS 内边距属性（Padding） */

    /* padding
    ** eg: padding[5,10]/padding[5,10,5]/padding[5,10,5,10]
    */
    case css.search(/padding/i) :
         return "padding:" + css.slice(8, css.length - 1).split(",").join(" ");    

    /* CSS 文本属性（Text）*/

    /* color
    ** eg: #000/#000000/rgb(0,0,255)/rgba(0,0,255,0.5)/red/blue
    */
    case css.search(/#[0-9a-fA-F]{3}/i) && css.search(/#[0-9a-fA-F]{6}/i) && css.search(/rgba?/i) :
         return "color:" + css;

    /* text-align
    ** eg: left/right/center
    */
    case css.search(/left/i) && css.search(/right/i) && css.search(/center/i) :
         return "text-align:" + css;

    /* CSS 尺寸属性（Dimension） */

    /* width
    ** eg: w100px/w50%/wauto
    */
    case css.search(/w\d+[px|%]/i) && css.search(/wauto/i) :
         return "width:" + css.slice(1);

    /* height
    ** eg: h100px/h50%/hauto
    */
    case css.search(/h\d+[px|%]/i) && css.search(/hauto/i) :
         return "height:" + css.slice(1);



    /* CSS 边框属性（Border） */

    /* border :
    **   border-width
    **   border-style
    **   border-color
    ** eg:border[5px,solid,red]
    */
    case css.search(/border/i) :
         return "border:" + css.slice(7, css.length - 1).split(",").join(" ");

    default :
        return css;
  }
}

module.exports = toCSS;