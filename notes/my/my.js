//--------------------------------------浏览器兼容---------------------------------------
//求滚动条位置
function getScrollOffset(){
    if(window.pageXOffset || window.pageYOffset){
        return {
            x:window.pageXOffset,
            y:window.pageYOffset
        }
    }else{
        return {
            x:document.body.scrollLeft + document.documentElement.scrollLeft,
            y:document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//获取当前窗口宽高
function getViewportOffset(){
    if(window.innerWidth){
        return{
            w: window.innerWidth,
            h:window.innerHeight
        }
    }else if(document.compatMode == 'BackCompat'){
        return{
            w:document.body.clientWidth,
            h:document.body.clientHeight
        }
    }else{
        return{
            w:document.documentElement.clientWidth,
            h:document.documentElement.clientHeight
        }
    }
}
//监听窗口变化
function lis_win_size(){
    window.onresize = function () {
        var Width = window.innerWidth//浏览器窗口的内部宽度（包括滚动条）
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）
            || document.documentElement.clientWidth
            || document.body.clientHeight;
        console.log(Width, Height);
    
    }
}
//获取目标元素的最终显示样式
function getStyle(element,prop){
    if(window.getComputedStyle){
        //window.getComputedStyle(element,'after')获取伪元素的显示样式表
        return window.getComputedStyle(element,null)[prop];
    }else{
        return element.currentStyle[prop];
    }
}
//事件处理函数
function addEvent(elem,type,handle){
    if(elem.addEventListener){
        elem.addEventListener(type,handle,false);
    }
    else if(elem.attachEvent){
        elem.attachEvent('on'+ type, function(){
            handle.call(elem);//this都指向调用者元素
        })
    }else{
        elem['on' + type] = handle;
    }
}
//阻止事件冒泡
function stopBubble(event){
    if(event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}
//组织默认事件
function cancelHandler(event){
    if(event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
}
//拖拽元素移动
function drag(element){
    var disX,
        disY;
    element.addEventListener('mousedown',function(e){
        var e = e || window.event;
        disX = e.pageX - parseInt(element.style.left);
        disY = e.pageY - parseInt(element.style.top);
        document.addEventListener('mousemove',mouseMove,false);
        document.addEventListener('mouseup',function(){
            document.removeEventListener('mousemove',mouseMove,false);
        },false);
        stopBubble(e);//取消事件冒泡，上述封装
        cancelHandler(e);//取消默认事件，上述封装
    },false)
    function mouseMove(e){
        var e = e || window.event;
        element.style.left = e.pageX - disX + 'px';
        element.style.top = e.pageY - disY + 'px';
    }
}

//异步加载js
function load(src,func){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if(script.readyState){//先绑定监听时间
        script.onreadystatechang = function(){
            if(script.readyState == 'complete' || script.readyState == 'loaded'){
                func();//执行js中的方法
                test();
            }
        }
    }else{
        script.onload = function(){//Safari Chrom firefox opera
            func()//执行js中的方法
            
        }
    }
    script.src = src;
    document.head.appendChild(script);
}













