let canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//设置画笔，绘制上下文
let ctx = canvas.getContext('2d');
// let x = 10
// ctx.arc(x,200,100,0,Math.PI*2);
// //ctx.stroke();//下笔画线条
// ctx.fillStyle = 'blue' 
// ctx.fill();//填充

//鼠标
var mouse = {
    x:canvas.width/2,
    y:canvas.height/2
}
window.addEventListener('mousemove',function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})
radiusMax = 30;
//创建球的构造函数
function Ball(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    let r = this.radius;
    this.draw = function(){
        ctx.beginPath();//新起一个路径画
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();//结束这个路径
    }
    this.update = function(){
        if(this.x + this.radius> canvas.width || this.x - this.radius< 0 ){
            this.dx = - this.dx;
        }
        if(this.y + this.radius> canvas.height || this.y - this.radius< 0 ){
            this.dy = - this.dy;
        }
        if( mouse.x - this.x < 50 && mouse.x - this.x >-50 
            && mouse.y - this.y < 50 && mouse.y - this.y >-50){
            
            // -50 <( mouse.x - this.x < 50) && -50 < (mouse.y - this.y )< 50
            if(this.radius <= radiusMax)this.radius += 1;
        }
        else if(this.radius > r){
            this.radius -=1;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

}

var ball = new Ball(100,100,10,1,50,'red');
var ballArr = [];
var colorArr = ['red','blue','green','black','yellow']
for(let i = 0; i < 500; i++){
    let x = Math.random()*canvas.width;
    let y = Math.random()*canvas.height;
    let dx = (Math.random()-0.5) * 2;
    let dy = (Math.random()-0.5) * 2;
    let radius = Math.random() * 4 + 1;
    let index = Math.floor(Math.random() * 5);
    ballArr.push(new Ball(x,y,dx,dy,radius,colorArr[index]));
}

//动画
function animate(){
    requestAnimationFrame(animate)
    ctx.clearRect(0,0,canvas.width,canvas.height)//清除之前的页面
    ballArr.forEach((node, i )=>{
        node.update();
    })
}
animate();