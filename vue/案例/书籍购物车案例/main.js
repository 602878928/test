setTimeout(()=>{
    const app = new Vue({
        el:'#app',
        data:{
            books:[
                {
                    id:1,
                    name:'demo1',
                    date:'2020-01',
                    price:89,
                    count:1,
                },
                {
                    id:2,
                    name:'demo2',
                    date:'2020-02',
                    price:389,
                    count:1,
                },
                {
                    id:3,
                    name:'demo3',
                    date:'2020-03',
                    price:289,
                    count:1,
                },
                {
                    id:4,
                    name:'demo4',
                    date:'2020-04',
                    price:189,
                    count:1,
                },
            ],
            deleteId:null,
        },
        computed:{
            totalPrice(){
                // let total = 0;
                // let len = this.books.length;
                // for(let i =0; i < len; i++){
                //     total +=this.books[i].price * this.books[i].count;
                // }
                // return total

                //高阶函数 reduce
                return this.books.reduce((pre,n)=>pre + n.price * n.count , 0)
            }
        },
        methods:{
            del(i){
                this.deleteId = this.books[i].id;
                this.books.splice(i, 1);
            },
        },
        filters:{//过滤器
            showPrice(price){
                return '￥' + price.toFixed(2);
            }
        }
    })
},3000)