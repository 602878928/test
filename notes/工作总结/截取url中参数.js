function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

//decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。

// back()方法，加载 history 列表中的前一个 URL。

// 语法：

// window.history.back();
// 比如，返回前一个浏览的页面，代码如下：

// window.history.back();
// 注意：等同于点击浏览器的倒退按钮。

// back()相当于go(-1),代码如下:

// window.history.go(-1);