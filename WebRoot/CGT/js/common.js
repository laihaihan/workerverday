/**
 * 解决IE9的Range不存在createContextualFragment方法导致Ext出错的BUG by xhuatang@linewell.com 2011-3-23
 */
if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment)
{ 
  Range.prototype.createContextualFragment = function(html)
  {
    var frag = document.createDocumentFragment(), 
    div = document.createElement("div");
    frag.appendChild(div);
    div.outerHTML = html;
    return frag;
  };
}

/**
 * 验证英文名称
 */
function validateNameEn(value){
    if(!value){ return true;}
    var pattern =  new RegExp("^[a-zA-Z][a-zA-Z0-9]{0,19}$", "g");
    return pattern.test(value);
}   