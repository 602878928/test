let canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');


function Ball(x,y,dx,dy,radius,color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    var indexY = this.y;
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,radius,0,Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };
    this.update = function(){
        if(this.y + this.radius + this.dy + 0.8> canvas.height ){
            this.y = canvas.height - this.radius;
            this.dy = -this.dy;
            this.dy *= 0.9;
        }else if(this.dy > 0){
            this.dy += 0.8;
        }else if(this.dy < 0){
            this.dy += 0.8;
        }
        // if( this.y - radius < canvas.height - indexY && this.dy < 0 ){
        //     this.dy = -this.dy;
        // }
        this.y += this.dy;
        this.draw();
    }

}

let ball = new Ball(300,300,1,1,50,'green');
ball.draw();
console.log(ball)
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ball.update();

}
animate();