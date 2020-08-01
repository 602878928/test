<template>
  <div>
    <div class="all" v-show="indexShow">
      <div class="title">
        <h1>一厂三车间计划单耗</h1>
      </div>
      <div class="top clear-fix">
        <!-- :value.sync="value"  v-model="value"   -->
        <i-input id="input" v-model="value" placeholder="请输入..." style="width: 200px" format="yyyy-MM-dd"></i-input>
        <row>
            <i-col id="startTime" span="12">
              <Date-picker type="date"  placeholder="选择日期" style="width: 200px"  @on-change="upData('startTime',$event)" ></Date-picker>
            </i-col>
            <i-col id="endTime" span="12">
                <Date-picker type="date" placeholder="选择日期" style="width: 200px" @on-change="upData('endTime',$event)"></Date-picker>
            </i-col>
        </row>
        <div class="btn">
          <i-button size="small" @click="search">查询</i-button>
          <i-button size="small">新增</i-button>
          <i-button size="small">删除</i-button>
        </div>
      </div>
      <!-- <i-table  id="table" 
                :columns="columns4" 
                :data="data1" 
                @on-row-dblclick="dblclick($event)"
                @on-selection-change="selected($event)"
                ></i-table> -->
      <div style="height: calc(100% - 64px)">
        <vxe-table :data="table_body" resizable size="small" border highlight-hover-row
                  highlight-current-row height="100%" @cell-dblclick="dblclick($event)"
                  @checkbox-change="selected($event)"  >
          <vxe-table-column type="checkbox" width="28" align="center"></vxe-table-column>
          <vxe-table-column field="serialNumber" title="序号" width="150" align="center"></vxe-table-column>
          <vxe-table-column field="factoryName" title="厂名" width="150" sortable show-overflow="title"></vxe-table-column>
          <vxe-table-column field="workshopName" title="车间名" width="150"  sortable show-overflow="title"></vxe-table-column>
          <vxe-table-column field="date" title="日期" width="150" sortable show-overflow="title"></vxe-table-column>
          <vxe-table-column field="consumptionPlan" title="计划单耗" width="150" sortable show-overflow="title"></vxe-table-column>
          
        </vxe-table>
      </div>   
      <Page :total="total" :page-size="pageSize" show-total @on-change="changePage($event)"></Page>
    </div>
    <v-info v-show="infoShow" @itemclick="change" :cdata="selectData" ref="aaa">
    </v-info>
  </div>
</template>
<script>
import danhao from './danhao'
export default {
  props:{

  },
  components:{
    'v-info':danhao,
  },
    data(){
      return{
        indexShow:true,
        infoShow:false,
        startTime:'null',
        endTime:'null',
        value:'123',
        selectData:null,
        pageSize:8,
        total:100,
        nowPage:1,
        selectArr:[],
        screenWidth: document.body.clientWidth,
              table_body: [
                  {
                      serialNumber: '0004',
                      factoryName: '四厂',
                      workshopName: '四车间',
                      date:'2020-06-04',
                      consumptionPlan:480
                  },
                  {
                      serialNumber: '0002',
                      factoryName: '二厂',
                      workshopName: '二车间',
                      date:'2020-06-02',
                      consumptionPlan:280
                  },
                  {
                      serialNumber: '0005',
                      factoryName: '五厂',
                      workshopName: '五车间',
                      date:'2020-06-05',
                      consumptionPlan:580
                  },
                  {
                      serialNumber: '0003',
                      factoryName: '三厂',
                      workshopName: '三车间',
                      date:'2020-06-03',
                      consumptionPlan:380
                  },
              ]
          
      
      
      }
    },
    methods:{
      //状态切换
      change(){
        this.indexShow=true;
        this.infoShow=false;
      },
      upData(dataName,e){
        this[dataName] = e;
      },
      dblclick(e){
        this.indexShow = false;
        this.infoShow = true;
        this.selectData = e;
        console.log(e , 'dblclick');
      },
      changePage(e){
        this.nowPage = e; 
      },
      //统计选中状态
      selected(e){
        this.selectArr = e
      },
      //查询、搜索
      search(){
        // console.log(this.$refs.aaa);
        // console.log(window.onresize,'!!!!!!!!!!!!!');
        console.log(document.body.clientWidth);
      }
    },
    mounted(){
    const that = this
    window.onresize = () => {
      return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
          console.log('mounted111');
      })()
    }
        },
    watch:{
    screenWidth(val){
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!this.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            this.screenWidth = val
            this.timer = true
            let that = this
            setTimeout(function(){
                // 打印screenWidth变化的值
                console.log(that.screenWidth)
                that.timer = false
            },400)
        }
    }
},
    computed:{

    },
    filters:{
    }
}
</script>
<style lang="scss" scoped>
  .clear-fix::after{
    content: '';
    display: block;
    clear: both;
  }
  .title{
    width: 400px;
    height: 100px;
    margin: 0 auto;
    position: relative;
  }
  h1{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -117px;
    margin-top: -16px;
    color: #48ccfd;
    font-size: 26px;
  }
  .top{
    margin: 30px 0;
  }
  .btn{
    float: right;
  }
  button{
    padding: 0 10px;
    margin: 0 3px;
    float: left; 
  }
  // .act{
  //   color: #2db7f5;
  // }
  //主体
  .all{
    // width: 100%;
    // height: 100%;
    width: 1200px;
    margin: 0 auto;
  }
  #startTime，
  #endTime,
  #input,
  .btn{
    margin: 0 30px;
  }
  //输入框
  #input{
    float: left;
    left: 0px;
  }
 
</style>