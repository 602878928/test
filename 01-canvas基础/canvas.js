// 绘图步骤：
// 1、找到canvas元素
// 2、创建一个绘图上下文（画笔）
// 3、描述要绘制的图形
// 4、下笔

var canvas = document.getElementById('myCanvas');
//图形上下文 （获取画笔）
var ctx = canvas.getContext('2d');
//绘制矩形
// ctx.fillStyle='#FF0000';
// ctx.fillRect(0,0,100,50);

//moveTo()、lineTo()绘制直线
// ctx.moveTo(0,50);
// ctx.lineTo(50,100);
// ctx.stroke();//下笔   画

//obj.arc();绘制圆形 obj.arc(圆心x,y,半径，起始角度，结束角度，false顺时针/true逆时针)
ctx.arc(50,50,20,0,Math.PI*2 );
ctx.stroke();