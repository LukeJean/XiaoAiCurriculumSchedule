//判断变量是否为空
function isEmpty(param){
  if(param){
      var param_type = typeof(param);
      if(param_type == 'object'){
          //要判断的是【对象】或【数组】或【null】等
          if(typeof(param.length) == 'undefined'){
              if(JSON.stringify(param) == "{}"){
                  return true;//空值，空对象
              }
          }else if(param.length == 0){
              return true;//空值，空数组
          }
      }else if(param_type == 'string'){
          //如果要过滤空格等字符
          var new_param = param.trim();
          if(new_param.length == 0){
              //空值，例如:带有空格的字符串" "。
              return true;
          }
      }else if(param_type == 'boolean'){
          if(!param){
              return true;
          }
      }else if(param_type== 'number'){
          if(!param){
              return true;
          }
      }
      return false;//非空值
  }else{
      //空值,例如：
      //(1)null
      //(2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
      //(3)空字符串''、""。
      //(4)数字0、00等，如果可以只输入0，则需要另外判断。
      return true;
  }
}

function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
const ifrs = dom.getElementsByTagName("iframe")
if(ifrs.length){
    for(let i = 1;i<ifrs.length;i++){
        if(!isEmpty(ifrs[i].contentDocument.getElementById('Form1'))){
          iframeContent = ifrs[i].contentDocument.getElementById('Form1').innerHTML;
        }
    }
}
return iframeContent;
}